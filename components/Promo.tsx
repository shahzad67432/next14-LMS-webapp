import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Promo = () => {
  return (
    <div className='rounded-xl border-2 p-4 space-y-4'>
        <div className='space-y-2 '>
            <div className='flex items-center gap-x-2'>
                <Image
                    src={'/unlimited.svg'}
                    alt="pro"
                    width={28}
                    height={28}
                />
                <h3 className='font-bold text-lg'>
                    Upgrade to pro
                </h3>
            </div>
            <p className='text-muted-foreground'>Get unlimited hearts and more!</p>
        </div>
        <Button
                asChild
                variant={'super'}
                size={"lg"}
                className='w-full'
            >
            <Link href={'/shop'}>
                Upgrade today
            </Link>
        </Button>
    </div>
  )
}

export default Promo