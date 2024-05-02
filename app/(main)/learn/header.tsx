import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type props = {
    title: string;
}

const Header = ({title}: props) => {
  return (
    <div className='pb-3 lg:pt-[28px] lg:mt-[-28px] sticky top-0 bg-white flex justify-between border-b-2 mb-5 items-center text-neutal-400 z-50 '>
        <Link href={'/courses'}>
            <Button variant={'ghost'} size={'sm'}>
                <ArrowLeft className='w-5 h-5 stroke-2 text-neutral-400'/>
            </Button>
        </Link>
        <div className='text-neutral-400 font-bold text-lg'>
            {title}
        </div>
        <div>

        </div>
    </div>
  )
}

export default Header