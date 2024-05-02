import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    }
    catch(error: any){
        return new Response(`webhook error: ${error}`, {status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed"){
        const subscribtion = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        if(!session?.metadata?.userId){
            return new Response("userId is required", {status: 400})
        }
        
        await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripeSubscriptionId: subscribtion.id,
            stripeCustomerId: subscribtion.customer as string,
            stripePriceId: subscribtion.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscribtion.current_period_end * 1000),
        })
    }

    if(event.type === "invoice.payment_succeeded"){
        const subscribtion = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await db.update(userSubscription).set({
            stripePriceId: subscribtion.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscribtion.current_period_end * 1000),
        }).where(eq(userSubscription.stripeSubscriptionId, subscribtion.id))
    }

    return new NextResponse(null, {status: 200})
}