'use client'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'

const Services = () => {
  return (
    <div>
        <div>
        <h1 className='text-3xl font-bold text-neutral-600'>
            Services
        </h1>
        </div>
        <div className='rounded-xl border-t-2 border-green-100 lg:w-[900px] lg:max-h-[350px] overflow-scroll'>
            <div className='bg-green-50 w-full pt-5 pr-5 pl-5 h-full'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-around w-full h-[300px]'>
                        <motion.div className=' w-[180px]  lg:w-[280px] lg:h-[260px] flex flex-col mt-10 text-start ml-10'>
                            <h1 className='text-xl font-bold text-neutral-600 mb-10' >Multiple Languages</h1>
                            <p className='font-bold text-neutral-400'>
                                Master multiple languages with ease. Study, practice, and progress seamlessly. Start learning today!
                            </p>
                        </motion.div>
                        <motion.div animate={{ rotate:" 360deg"}} transition={{duration: 3, delay: 0.01, repeat: Infinity}} className='h-[200px] w-[250px] lg:w-full lg:h-full flex justify-center rounded-full'>
                            <Image src="/langs.png" width={350} height={200} alt="week"/>
                        </motion.div>
                    </div>
                    <div className='flex flex-row justify-around w-full h-[300px]'>
                        <div className=' w-[280px] h-[260px] flex flex-col mt-10 text-start ml-10'>
                            <h1 className='text-xl font-bold text-neutral-600 mb-10' >Weekly tasks</h1>
                            <p className='font-bold text-neutral-400'>
                            Stay on top of weekly tasks effortlessly. Organize, prioritize, and track progress seamlessly. Boost productivity today!
                            </p>
                        </div>
                        <div className='w-full max-h-[250px] flex justify-center items-center pt-10'>
                            <Image src="/week4.png" width={300} height={200} alt="week" className='rounded-3xl'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services