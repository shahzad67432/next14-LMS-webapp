"use client"
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import SidebarItems from './SidebarItems';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface props {
  className?: string
}

const Sidebar = ({className}:props) => {

  return (
    <div className= {cn("lg:w-[256px] lg:fixed h-full flex left-0 top-0 px-4 border-r-2 flex-col", className)}>
      <div className='pl-4 flex items-center p-5 pb-8'>
          <Link href={'/learn'} className='cursor'>
            <Image src={"/logo.png"} width={40} height={40} alt="logo" />
          </Link>
          <h1 className='pt-2 pl-2 text-xl font-bold text-green-600'>
            Toungetrek
          </h1>
      </div>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItems label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItems label="Leaderboard" href="/leaderboard" iconSrc="/leaderboard.svg" />
        <SidebarItems label="Quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItems label="Shop" href="/shop" iconSrc="/shop.svg" />
      </div>
      <div className='p-4'>
        <ClerkLoading>
          <Loader className='h-5 w-5 animate-spin text-muted-foreground'/>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl='/'/>
        </ClerkLoaded>

      </div>
    </div>
  )
}

export default Sidebar;