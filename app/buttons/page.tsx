import { Button } from '@/components/ui/button'
import React from 'react'

const ButtonsPage = () => {
  return (
    <div className='p-2 space-y-4 flex flex-col max-w-[200px]'>
        <Button>Default</Button>
        <Button variant= "primary" >Primary</Button>
        <Button variant="primaryOutline">Primary Outtline</Button>
        <Button variant= "secondary" >secondary</Button>
        <Button variant="secondaryOutline">secondary Outtline</Button>
        <Button variant= "danger" >danger</Button>
        <Button variant="dangerOutline">danger Outtline</Button>
        <Button variant= "super" >super</Button>
        <Button variant="superOutline">super Outtline</Button>

        <Button variant="ghost">ghost</Button>

        <Button variant= "sidebar" >sidebar</Button>
        <Button variant="sidebarOutline">sidebar Outtline</Button>
        
    </div>
  )
}

export default ButtonsPage