import React from 'react'

const Lessonlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col w-full h-full'>
        {children}
      </div>
    </div>
  )
}

export default Lessonlayout