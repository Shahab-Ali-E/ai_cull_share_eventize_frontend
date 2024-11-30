"use client"

import React from 'react'
import { Button } from '../../ui/button'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io';


function BackButton() {
  const router  = useRouter();
  return (
    <Button
      variant={"outline"}
      className="mt-10 flex space-x-3 rounded-sm border border-muted-foreground text-primary lg:py-5 lg:text-xl"
      onClick={()=>{router.back()}}
    >
        <IoIosArrowBack className="h-4 w-4 opacity-50"/>
        <span className='text-base'>
          Back
        </span>
    </Button>
  )
}

export default BackButton