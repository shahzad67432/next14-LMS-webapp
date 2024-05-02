import FeedWraper from '@/components/FeedWraper'
import StickyWraper from '@/components/StickyWraper'
import UserProgress from '@/components/UserProgress'
import { getTopTenUsers, getUserProgress, getUserSubscribtion } from '@/db/queries'
import { userProgress } from '@/db/schema'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import LottieAnimation from './animation'
import animationData from '../../../public/position.json'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Promo from '@/components/Promo'
import Quests from '@/components/Quests'


const LeaderBoardPage = async() => {
  const userProgressData = getUserProgress()
  const userSubscribtionData = getUserSubscribtion()
  const LeaderboardData = getTopTenUsers()

  const [userProgress, userSubscribtion, Leaderboard ] = await Promise.all([
    userProgressData,
    userSubscribtionData,
    LeaderboardData,
  ])
  if(!userProgress){
    redirect('/courses')
  }

  const isPro = !!userSubscribtion?.isActive;

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWraper>
      <UserProgress
        activeCourse = {userProgress?.activeCourse}
        hearts = {userProgress?.hearts}
        points = {userProgress?.points}
        hasActiveSubscription = {isPro}
      />
      {!isPro && (<Promo/>)}
      <Quests points={userProgress.points}/>   
      </StickyWraper>
      <FeedWraper>
        <div className='w-full flex flex-col items-center '>
          <div className='max-w-[140px] max-h-[140px] lg:max-w-[200px] lg:max-h-[200px] mx-auto lg:mx-auto'>
            <LottieAnimation animationData = {animationData}/>
          </div>

          <h1 className='text-center font-bold text-2xl text-neutral-800 my-6'>
            Leaderboard
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            See where you stand among others learners in the community.
          </p>
          <Separator className='mb-4 h-0.5 rounded-full'/>
          {Leaderboard.map((userProgress, index)=>(
              <div 
                key={userProgress.userId}
                className='flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50'
                >
                <p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
                <Avatar className='border bg-green-500 h-12 w-12 ml-3 mr-6'>
                  <AvatarImage
                  className='object-cover'
                    src={userProgress.userImageSrc}
                  />
                </Avatar>
                <p className='font-bold text-neutral-800 flex-1'>{userProgress.userName}</p>
                <p className='text-muted-foreground'>{userProgress.points} XP</p>
              </div>
          ))}
        </div>
      </FeedWraper>


    </div>
  )
}

export default LeaderBoardPage;