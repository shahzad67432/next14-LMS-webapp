"use server"

import db from "@/db/drizzle"
import { getCourseById, getUserProgress, getUserSubscribtion } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs"
import { error } from "console"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number)=>{
    const {userId} = await auth()
    const user = await currentUser()

    if(!userId || !user){
        throw new Error("Unauthorized")
    }
    const course = await getCourseById(courseId)

    if(!course){
        throw new Error("Course not found")
    }

    
    if(!course.units.length || !course.units[0].lessons.length){
        throw new Error("Course is empty")
    }

    const existingUserProgress = await getUserProgress()
    if(existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId: course.id,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/user.svg"
        })
        revalidatePath('/courses')
        revalidatePath('/learn')
        redirect('/learn')
    }
    await db.insert(userProgress).values({
        userId,
        activeCourseId: course.id,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/user.svg"
    })
    revalidatePath('/courses')
    revalidatePath('/learn')
    redirect('/learn')
}
export const reduceHearts = async(challengeId: number)=>{
    const {userId} = await auth()
    if(!userId){
        throw new Error("Unauthorized")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })
    if(!challenge){
        throw new Error("challenge not found");
    }
    const lessonId = challenge.lessonId;

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscribtion();
    if(!currentUserProgress){
        throw new Error("user pregresss not found ")
    }
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress
    
    if(isPractice){
        return {error : "practice"}
    }

    if(userSubscription?.isActive){
        return {error: "subscription"}
    }

    if(currentUserProgress.hearts === 0){
        return {error: "hearts"};
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(
        eq(userProgress.userId, userId),
    )
    revalidatePath('/shop')
    revalidatePath('/learn')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')
    revalidatePath(`/lessons/${lessonId}`)

}

export const refillHearts = async()=>{

    const currentUserProgress = await getUserProgress()
    if(!currentUserProgress){
        throw new Error("user pregresss not found ")
    }
    if(currentUserProgress.hearts === 5){
        throw new Error(" hearts are already full ")
    }
    if(currentUserProgress.points < 50){
        throw new Error(" points are not enough ")
    }

    await db.update(userProgress).set({
        hearts: 5,
        points: Math.max(currentUserProgress.points - 50, 0),
    }).where(eq(userProgress.userId, currentUserProgress.userId))

    revalidatePath('/shop')
    revalidatePath('/learn')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')

}