import React from 'react'

const FeedWraper = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex-1 relative top-0 pb-10'>
        {children}
    </div>
  )
}

export default FeedWraper