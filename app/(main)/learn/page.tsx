import { redirect } from 'next/navigation'
import FeedWraper from '@/components/FeedWraper'
import StickyWraper from '@/components/StickyWraper'
import { WrapText } from 'lucide-react'
import React from 'react'
import Header from './header'
import UserProgress from '@/components/UserProgress'
import Promo from '@/components/Promo'
import { challenges, lessons } from '@/db/schema'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscribtion } from '@/db/queries'
import Loading from './Loading'
import Unit from './Unit'
import Quests from '@/components/Quests'

const Learnpage = async() => {
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()
  const userSubscribtionData = getUserSubscribtion()

  const [userProgress, units, courseProgress, lessonPercentage, userSubscribtion] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscribtionData
  ])

  if(!userProgress){
    return redirect('/courses')
  }
  if(!courseProgress){
    return redirect('/courses')
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
          <Header title= {userProgress?.activeCourse?.title!} />
          {units.map(async(unit)=>{
            return (
              <div key={unit.id}>
                <Unit
                  id={unit.id}
                  title={unit.title}
                  description={unit.description}
                  order={unit.order}
                  //@ts-ignore
                  //todo give lesson some better types.
                  lessons={unit.lessons}
                  activeLesson = {courseProgress.activeLesson}
                  activeLessonPercentage={lessonPercentage}
                />
              </div>
            )
          })}
        </FeedWraper>
    </div>
  )
}

export default Learnpage