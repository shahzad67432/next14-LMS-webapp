import FeedWraper from '@/components/FeedWraper'
import StickyWraper from '@/components/StickyWraper'
import UserProgress from '@/components/UserProgress'
import { getUserProgress, getUserSubscribtion } from '@/db/queries'
import { userProgress } from '@/db/schema'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import Items from './Items'
import Promo from '@/components/Promo'
import Quests from '@/components/Quests'

const ShopPage = async() => {
  const userProgressData = getUserProgress()
  const userSubscribtionData = getUserSubscribtion()

  const [ userProgress, userSubscribtion ] = await Promise.all([
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
      <Quests points={userProgress.points}/>
      </StickyWraper>
      <FeedWraper>
        <div className='w-full flex flex-col items-center '>
          <Image
            src={'/shop.svg'}
            alt='shop'
            width={90}
            height={90}
          />

          <h1 className='text-center font-bold text-2xl text-neutral-800 my-6'>
            Shop
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            spend your coins on cool stuff.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWraper>

    </div>
  )
}

export default ShopPage