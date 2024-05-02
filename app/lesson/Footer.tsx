import React from 'react'
import { useKey, useMedia } from 'react-use'
import { CheckCircle, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button' 

type props = {
    lessonId?: number
    status: "none" | "wrong" | "correct" | "completed"
    onCheck: () => void
    disabled?: boolean
}

const Footer = ({
    lessonId,
    status,
    onCheck,
    disabled
}:props) => {
    useKey("Enter", onCheck, {}, [onCheck])
    const isMobile = useMedia("(max-width: 1024px)")

  return (
    <footer className={cn(
        "lg:h-[120px] h-[100px] border-t-2",
        status === "wrong" && "border-tranparent bg-rose-100",
        status === "correct" && "border-tranparent bg-green-100"
    )}>
        <div className='max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10'>
            {status === "correct" && 
                <div className='text-base text-green-500 font-bold lg:text-2xl flex items-center'>
                    <CheckCircle className='h-6 w-6 mr-4 lg:h-10 lg:w-10'/>
                    Nicel&apos;s Done
                </div>
            }
            {status === "wrong" && 
                <div className='text-base text-rose-500 font-bold lg:text-2xl flex items-center'>
                    <XCircle className='h-6 w-6 mr-4 lg:h-10 lg:w-10'/>
                    Try again.
                </div>
            }
            {status === "completed" && 
                <Button 
                    variant={"default"}
                    size={isMobile? "sm" : "lg"}
                    onClick={()=>{
                        window.location.href = `/lesson/${lessonId}`
                    }}

                >
                    Practice again.
                </Button>
            }
            <Button
                disabled={disabled}
                className='ml-auto rounded-xl'
                onClick={onCheck}
                size={isMobile ? 'sm' : 'lg'}
                variant={status === "wrong" ? "danger"  : "secondary"}

            >
                {status === "none" && "Check"}
                {status === "correct" && "Next"}
                {status === "wrong" && "Retry"}
                {status === "completed" && "Continue"}

            </Button>
        </div>
    </footer>
  )
}

export default Footer