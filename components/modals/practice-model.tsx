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
import { usePracticeModal } from '@/store/use-practice-modal'

const PracticeModal = () => {
    const router = useRouter();
    const {isOpen, close} = usePracticeModal()
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
                        src='/heart.svg'
                        alt='heart'
                        width={100}
                        height={100}
                    />
                </div>
                <DialogTitle className='font-bold text-2xl text-center' >
                        Practice lesson.
                </DialogTitle>
                <DialogDescription className='text-base text-center'>
                    use practice lessons to regain hearts and in practive you would not loose hearts.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4'>
                <div className='w-full flex flex-col gap-y-4'>
                    <Button variant={"primary"} className='w-full' size={'lg'} onClick={close} >
                        I understand
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default PracticeModal;