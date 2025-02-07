import Navbar from '@/components/navbar';
import React from 'react'

function EventManagmentLayout({
    children,
  }: {
    children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col space-y-10 px-0 md:px-10 pb-20 bg-secondary'>
        {/* Navbar */}
        <Navbar />
        <div className="w-full">{children}</div>
    </section>
  )
}

export default EventManagmentLayout