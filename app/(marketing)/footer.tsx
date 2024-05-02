import { Button } from '@/components/ui/button'
import { FooterComponent } from '@/components/ui/footerLinks'
import { Ghost } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='hidden lg:block border-t-2 h-20 border-slate-200 p-2 w-full'>
        <div className='max-w-screen-lg mx-auto flex items-center justify-evenly'>
          <Button className='w-full' size={"lg"} variant={"ghost"}>
            <Image src="/spain.svg" width={50} height={50} alt="coroatian" className='mr-4 rounded-md' />
          </Button>
          <Button className='w-full' size={"lg"} variant={"ghost"}>
            <Image src="/it.svg" width={50} height={50} alt="coroatian" className='mr-4 rounded-md' />
          </Button>
          <Button className='w-full' size={"lg"} variant={"ghost"}>
            <Image src="/fr.svg" width={50} height={50} alt="coroatian" className='mr-4 rounded-md' />
          </Button>
          <Button className='w-full' size={"lg"} variant={"ghost"}>
            <Image src="/cr.svg" width={50} height={50} alt="coroatian" className='mr-4 rounded-md' />
          </Button>
        </div>
    </footer>
  )
}

export default Footer