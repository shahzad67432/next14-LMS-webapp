import { challengeOptions, challenges } from '@/db/schema'
import { cn } from '@/lib/utils';
import React from 'react'
import Card from './Card';

type props = {
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"]

}

const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type,
}:props) => {
  return (
    <div className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
    )}>
        {options.map((option, i)=>(
            <div key={option.id} >
                <Card
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    shortCut={`${i + 1}`}
                    selected  = {selectedOption === option.id}
                    onClick={()=> onSelect(option.id)}
                    disabled={disabled}
                    status={status}
                    audioSrc={option.audioSrc}
                    type={type}

                />
            </div>
        ))}
    </div>
  )
}

export default Challenge