"use client"
import { Button } from '@/components/ui/button'
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full h-[70px] px-4 border-slate-200 border-b-2 flex justify-between'>
      <div className='lg:max-w-screen-lg mx-auto flex flex-1 items-center justify-between bg-primary-foreground '>
        <div className='pl-4 flex items-center'>
          <Link href={'/'} className='cursor'>
            <Image src={"/logo.png"} width={50} height={50} alt="logo" />
          </Link>
          <h1 className='pt-2 pl-2 text-xl font-bold text-green-600'>
            Toungetrek
          </h1>
        </div>
        <ClerkLoading>
          <Loader className='h-5 w-5 animate-spin text-muted-foreground'/>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton
              afterSignOutUrl='/'
            />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode='modal'
              afterSignInUrl='/learn'
              afterSignUpUrl='/learn'
            >
              <Button size="lg" variant="ghost" className='pt-1'>Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default Header