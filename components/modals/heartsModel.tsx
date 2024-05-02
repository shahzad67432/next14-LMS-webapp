'use client'
import React from 'react'

import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader
} from '@/components/ui/dialog'

import {Button} from '@/components/ui/button'
import { useHeartsModel } from '@/store/use-hearts-model'

const HeartsModal = () => {
    const router = useRouter();
    const {isOpen, close} = useHeartsModel()
    const [isClient, setIsClient] = useState(false)

    const onClick = ()=>{
        close();
        router.push('/shop')
    }
    useEffect(()=>
        setIsClient(true)
    ,[])

    if(!isClient){
        return null;
    }
  return (
    <Dialog open={isOpen} onOpenChange={close} > 
        <DialogContent className='mx-w-md'>
            <DialogHeader>
                <div className='flex items-center w-full justify-center mb-5'>
                    <Image
                        src='/bad.svg'
                        width={120}
                        height={120}
                        alt='SadResponse'
                    />
                </div>
                <DialogTitle className='font-bold text-2xl text-center' >
                        Yoou ran out of hearts.
                </DialogTitle>
                <DialogDescription className='text-base text-center'>
                    Get <span className='font-bold bg-gradient-to-r from-yellow-600 via-rose-500 to-red-600 inline-block text-transparent bg-clip-text'>Pro</span> for unlimmited hearts or purchase in store
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4'>
                <div className='w-full flex flex-col gap-y-4'>
                    <Button variant={"primary"} className='w-full' size={'lg'} onClick={onClick} >
                        Get unlimmited hearts
                    </Button>
                    <Button variant={"primaryOutline"} className='w-full' size={'lg'} onClick={close} >
                        No thank&apos;s
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default HeartsModal;