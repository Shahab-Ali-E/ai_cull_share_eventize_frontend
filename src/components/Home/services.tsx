import React from 'react'

const Services = ({mainHeading, textOverHeading, description}:{mainHeading:string, textOverHeading:string, description:string}) =>{
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center relative'>
        {/* Apply the correct text color class */}
        <p className='text-headingtext font-extrabold opacity-40 text-8xl xl:text-9xl lg:text-9xl md:text-8xl'>
          {mainHeading}
        </p>
        <p className='absolute top-14 left-1/2 font-extrabold text-base text-headingtext xl:text-2xl xl:top-16 lg:text-xl lg:top-20 md:text-base md:top-14'>
          {textOverHeading}
        </p>
      </div>
      <div className='text-primary flex flex-wrap font-medium text-base xl:text-xl lg:text-xl md:text-lg'>
        <p>{description}</p>
      </div>
    </div>
  );
  
}

export default Services