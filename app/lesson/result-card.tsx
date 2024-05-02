import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'


type props = {
    variant: "points" | "hearts"
    value: number
}

const ResultCard = ({value, variant}: props) => {
    const imageSrc = variant === "points" ? "/points.svg" : "/heart.svg";
  return (
    <div
        className={cn(
            "rounded-2xl border-2 w-full",
            variant === "points" && "bg-orange-400 border-orange-400",
            variant === "hearts" && "bg-rose-500 border-rose-500"
        )}
    >
        <div className={cn("p-1.5 text-xs text-center rounded-t-xl font-bold text-white uppercase",
            variant === "points" && "bg-orange-400",
            variant === "hearts" && "bg-rose-500"
        )}>
            {variant === "points" ? "Total xp" : "hearts left"}
        </div>
        <div className={cn(
            "rounded-2xl bg-white flex items-center justify-center p-6 font-bold text-lg",
            variant === "points" && "text-rose-500",
            variant === "hearts" && "text-orange-400 "
        )}>
            <Image
                src={imageSrc}
                height={30}
                width={30}
                alt="icon"
                className="mr-1.5"
            />
            {value}
        </div>

    </div>
  )
}

export default ResultCard