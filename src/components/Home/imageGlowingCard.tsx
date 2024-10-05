import Image from 'next/image'
import React from 'react'
import { StaticImageData } from 'next/image'
import GlowingCard from '../animata/card/glowing-card'

function ImageCard({image_path}:{image_path:StaticImageData}) {
  return (
    <GlowingCard className='flex-1 max-w-screen-2xl' >
        <Image src={image_path} alt='image-here' className='rounded-3xl'/>
    </GlowingCard>
  )
}

export default ImageCard