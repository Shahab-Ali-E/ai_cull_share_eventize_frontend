import Navbar from '@/components/navbar';
import React from 'react'

function EventManagmentLayout({
    children,
  }: {
    children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col space-y-10 px-2 sm:px-10 pb-20 bg-primary-foreground'>
        {/* Navbar */}
        <Navbar />
        <div className="w-full">{children}</div>
    </section>
  )
}

export default EventManagmentLayout