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
import { useExitModel } from '@/store/use-exit-model'

const ExitModel = () => {
    const router = useRouter();
    const {isOpen, close} = useExitModel()
    const [isClient, setIsClient] = useState(false)

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
                        src='/sadResponse.svg'
                        width={80}
                        height={80}
                        alt='SadResponse'
                    />
                </div>
                <DialogTitle className='font-bold text-2xl text-center' >
                        Wait, don&apos;t go
                </DialogTitle>
                <DialogDescription className='text-base text-center'>
                    Are you sure you want to leave?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4'>
                <div className='w-full flex flex-col gap-y-4'>
                    <Button variant={"primary"} className='w-full' size={'lg'} onClick={close} >
                        Kepp Learning
                    </Button>
                    <Button variant={"dangerOutline"} className='w-full' size={'lg'} onClick={()=>{
                        close();
                        router.push('/learn')
                        }} >
                        End Session
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ExitModel;