import Image from 'next/image'
import React from 'react'

type props = {
    question: string
}

const QuestionBubble = ({question}:props) => {
  return (
    <div className='flex items-center gap-x-4 mb-6'>
        <Image
            src={'/QuestionBubbleMascot1.svg'}
            width={60}
            height={60}
            alt='questoinMascot'
            className='hidden lg:block'
        />
        <Image
            src={'/QuestionBubbleMascot1.svg'}
            width={40}
            height={40}
            alt='questoinMascot'
            className='lg:hidden block'
        />
        <div className='relative px-4 py-2 border-2 rounded-xl text-sm lg:text-base'>
            {question}
        </div>
    </div>
  )
}

export default QuestionBubble