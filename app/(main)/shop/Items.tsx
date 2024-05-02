"use client"
import { refillHearts } from '@/actions/user-progress'
import { creteStripeUrl } from '@/actions/user-subscribtion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type props = {
    hearts: number
    points: number
    hasActiveSubscription: boolean
}

const Items = ({hearts, points, hasActiveSubscription,}:props) => {
    const [pending, startTransition] = useTransition()

    const onRefilltHearts = () => {
        if(pending || hearts === 5 || points < 50){
            return;
        }

        startTransition(()=>{
            refillHearts()
                .catch(()=>{ toast.error("something went wrong")})
        })
    }
    const onUpgrade = () => {
        startTransition(()=>{
            creteStripeUrl()
                .then((response)=>{
                    if(response.data){
                        window.location.href = response.data;
                    }
                })
                .catch((error)=>{ toast.error("something went wrong"), error})
        })
    }
  return (
    <ul className='w-full'>
        <div className='flex items-center w-full p-4 gap-x-4 border-t-2 '>
            <Image
                src={'/heart.svg'}
                alt='heart'
                width={60}
                height={60}
            />
            <div className='flex-1'>
                <p className='font-bold text-neutral-700 text-base lg:text-xl'>
                    Refill Hearts
                </p>
            </div>
            <Button
                onClick={onRefilltHearts}
                disabled = {pending || hearts === 5 || points < 50}
                className= {cn('cursor-pointer')}
            >
                {hearts === 5 ? "Full" : (
                    <div className='flex items-center '>
                        <Image
                            src={'/points.svg'}
                            width={20}
                            height={20}
                            alt='points'
                        />
                        <p>
                            50
                        </p>
                    </div>
                )}
            </Button>
        </div>
        <div className='flex items-center p-4 pt-8 border-t-2 w-full gap-x-4'>
            <Image src={'/unlimited.svg'} width={70} height={60} alt='unlimted hearts'/>
            <div className='flex-1'>
                <p className='font-bold text-neutral-700 text-base lg:text-xl' >
                    Unlimited Hearts
                </p>
            </div>
            <Button
                onClick={onUpgrade}
                disabled={pending}
            >
                {hasActiveSubscription ? "settings" : "upgrade"}
            </Button>
        </div>
    </ul>

  )
}

export default Items