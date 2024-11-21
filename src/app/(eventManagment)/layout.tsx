import Navbar from '@/components/navbar';
import React from 'react'

function EventManagmentLayout({
    children,
  }: {
    children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col space-y-32 bg-primary-foreground'>
        {/* Navbar */}
        <Navbar
        />
        <div className="w-full">{children}</div>
    </div>
  )
}

export default EventManagmentLayout