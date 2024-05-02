import React from 'react'
import Header from './header'
import Footer from './footer'
import { FooterComponent } from '@/components/ui/footerLinks'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>

        <div className='min-h-screen flex flex-col'>
            <Header/>
            <main className='flex flex-1 flex-col items-center text-center justify-center'>
                {children}
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default layout