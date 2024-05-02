import React from 'react'
import { Loader } from 'lucide-react'
const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center '>
        <Loader className='w-4 h-4 animate-spin text-neutral-600' />
    </div>
  )
}

export default Loading