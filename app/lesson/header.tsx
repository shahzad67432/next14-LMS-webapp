import { Progress } from '@/components/ui/progress'
import { useExitModel } from '@/store/use-exit-model'
import { InfinityIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type props = {
    hearts: number,
    percentage: number,
    hasActiveSubscription: boolean,

}

const Header = ({hearts, percentage, hasActiveSubscription}:props) => {
    
    const {open} = useExitModel()
  return (
    <>
    <div className='lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 max-w-[1140px] mx-auto w-full items-center justify-between'>
        <X
            onClick={open}
            className='text-slate-500 hover:opacity-75 transition cursor-pointer '
        />
        <Progress value={percentage}/>
        <div className='text-rose-500 flex items-center font-bold'>
            <Image
                src={'/heart.svg'}
                width={28}
                height={28}
                alt='heart'
            />
            {hasActiveSubscription? <InfinityIcon className='h-6 w-6 stroke-[3] shrink-0' /> : <div className='pb-3 w-6 h-6'>{hearts}</div> }
        </div>
    </div>
    </>
  )
}

export default Header