import FeedWraper from '@/components/FeedWraper'
import Promo from '@/components/Promo'
import StickyWraper from '@/components/StickyWraper'
import UserProgress from '@/components/UserProgress'
import { Progress } from '@/components/ui/progress'
import { getUserProgress, getUserSubscribtion } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import {quests} from '@/constants'


const QuestsPage = async() => {
  const userProgressData = getUserProgress()
  const userSubscribtionData = getUserSubscribtion()

  const [userProgress, userSubscribtion ] = await Promise.all([
    userProgressData,
    userSubscribtionData,
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
      </StickyWraper>
      <FeedWraper>
        <div className='w-full flex flex-col items-center '>
          <div className='max-w-[140px] max-h-[140px] lg:max-w-[200px] lg:max-h-[200px] mx-auto lg:mx-auto'>
            <Image
              src={'quests.svg'}
              width={90}
              height={90}
              alt='quests'
            />
          </div>

          <h1 className='text-center font-bold text-2xl text-neutral-800 my-6'>
            Quests
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            Complete quests by earning points.
          </p>
          <ul className='w-full'>
            {quests.map((quest)=>{
              const progress = (userProgress.points / quest.value) * 100;
              return(
                <div key={quest.title} className='flex items-center w-full p-4 gap-x-4 border-t-2'>
                    <Image
                      src={'/points.svg'}
                      width={60}
                      height={60}
                      alt='points'
                    />
                    <div className='flex flex-col gap-y-2 w-full'>
                      <p className='text-xl font-bold text-neutral-700'>
                        {quest.title}
                      </p>
                      <Progress
                        value={progress} className='h-3'
                      />
                    </div>
                </div>
              )
            })}
          </ul>
        </div>
      </FeedWraper>


    </div>
  )
}

export default QuestsPage;