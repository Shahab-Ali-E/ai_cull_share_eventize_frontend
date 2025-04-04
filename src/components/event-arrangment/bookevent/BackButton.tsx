"use client"

import React from 'react'
import { Button } from '../../ui/button'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io';


function BackButton({disabled=false}:{disabled?:boolean}) {
  const router  = useRouter();
  return (
    <Button
      type='button'
      variant={"outline"}
      className="mt-14 flex space-x-3 rounded-sm border border-muted-foreground text-primary lg:py-5 lg:text-xl"
      onClick={()=>{router.back()}}
      disabled={disabled}
    >
        <IoIosArrowBack className="h-4 w-4 opacity-50"/>
        <span className='text-base'>
          Back
        </span>
    </Button>
  )
}

export default BackButton