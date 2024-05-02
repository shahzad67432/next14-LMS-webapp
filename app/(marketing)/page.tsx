"use client"
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className=" relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb:8 lg:mb-0">
          <Image src={'/Banner.png'} fill alt="Banner"/>
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-8 ">
          <h1 className="text-xl lg:text-3xl font-bold max-w-[480px] text-neutral-600 ">
            Learn, Practice, master new Languages with Toungetrek
          </h1>
          <p className="text-neutral-400 font-bold flex items-start text-center pl-3">
            Discover, practice, and master new languages effortlessly with TongueTrek. Dive into a world of linguistic exploration, where learning knows no boundaries
          </p>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground"/>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  afterSignInUrl="/learn"
                  afterSignUpUrl="/learn"
                >
                  <Button size="lg" variant="secondary" className="w-full">Get Started</Button>
                </SignUpButton>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/learn"
                  afterSignUpUrl="/learn"
                >
                  <Button size="lg" variant="primaryOutline" className="w-full">I already have an Account</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button>
                  <Link href="/learn">
                    Continue Learning
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>
      <div>
        <Services/>
      </div>
    </>
  );
}
