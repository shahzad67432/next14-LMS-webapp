import { getCourses, getUserProgress } from '@/db/queries'

import React from 'react'
import List from './List'

const CoursesPage = async() => {
    const coursesData = getCourses()
    const userProgressData = getUserProgress()

    const [
        courses,
        userProgress
    ] = await Promise.all([
        coursesData,
        userProgressData,
    ])
  return (
    <div className='h-full max-w-[912px] px-3 mx-auto'>
        <h1 className='font-bold text-2xl text-neutral-700'>
            Language Courses
        </h1>
        <div>
            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    </div>
  )
}

export default CoursesPage