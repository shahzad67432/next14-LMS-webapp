import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    title: string
    description: string
}

const UnitBanner = ({title, description}: Props) => {
  return (
    <div className='w-full bg-green-500 text-white rounded-xl flex items-center justify-between p-5 cursor-pointer lg:cursor-default'>
        <Link href={'/lesson'}>
            <div className='space-y-2.5'>
                <h3 className='text-2xl font-bold'>{title}</h3>
                <p className='text-xl'>{description}</p>
            </div>
        </Link>
        <div>
            <Link href={'/lesson'}>
                <Button variant={'secondary'} size={"lg"} className='hidden xl:flex'>
                    <NotebookText className='mr-2'/>
                    Continue
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default UnitBanner