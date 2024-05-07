import React from 'react'

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu/>
        </SheetTrigger>
        <SheetContent className='p-0 z-[100]' side={"left"}>
            <Sidebar className=''/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar;
