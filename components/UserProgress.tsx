import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';

type Props = {
    hearts: number | undefined;
    points: number | undefined;
    hasActiveSubscription: boolean;
    activeCourse: {  id: number; imageSrc: string; title: string } | null | undefined; // Adjust the type to allow null or undefined
}

const UserProgress: React.FC<Props> = ({ hasActiveSubscription, hearts, points, activeCourse }) => {
    return (
        <div className='flex items-center justify-between gap-x-2 w-full'>
            {activeCourse ? (
                <Link href={'/courses'}>
                    <Button variant={'ghost'} >
                        <Image src={activeCourse.imageSrc}
                            alt={activeCourse.title}
                            width={32}
                            height={32}
                            className='rounded-md border'
                        />
                    </Button>
                </Link>
            ) : null}
            {/* Handle the case where activeCourse is null or undefined */}
            <Link href={'/shop'}>
                <Button variant={"ghost"} className='text-orange-500'>
                    <Image alt='points' height={28} width={28} src={'/points.svg'} className='mr-2' />
                    {points}
                </Button>
            </Link>
            <Link href={'/shop'}>
                <Button variant={"ghost"} className='text-rose-500'>
                    <Image alt='hearts' height={22} width={22} src={'/heart.svg'} className='mr-2' />
                    {hasActiveSubscription ? <InfinityIcon className='h-4 w-4 stroke-[3]' /> : <div>{hearts}</div>}
                </Button>
            </Link>
        </div>
    );
};

export default UserProgress;
