"use client"
import { courses, userProgress } from '@/db/schema'
import { redirect, useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import Card from './card';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';

type props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}
const List = ({courses, activeCourseId}: props) => {
    const route  = useRouter();
    const [pending, startTransition] = useTransition();
    const onClick = (id: number) => {
        if(pending) return;
        if(id === activeCourseId){
            return route.push('/learn')
        }

        startTransition(() => {
            upsertUserProgress(id)
             .catch(() => { toast.error("something went wrong") })
        })
        
    }
  return (
    <div className='pt-6 grid grid-cols-2 gap-4 lg:grid-cols-3'>
        {
            courses.map((course) => {
                return(
                    <Card
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        imageSrc= {course.imageSrc}
                        onClick={onClick}
                        disabled= {pending}
                        active={course.id === activeCourseId}
                    />
                )
            })
        }
    </div>
  )
}

export default List