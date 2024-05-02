import React from 'react'
import MobileSidebar from './MobileSidebar'
import Image from 'next/image'
import Link from 'next/link'

const MobileHeader = () => {
  return (
    <nav className='w-full h-[50px] px-6 flex lg:hidden items-center bg-green-500 fixed z-50 border-b top-0'>
        <MobileSidebar/>
    </nav>
  )
}

export default MobileHeader