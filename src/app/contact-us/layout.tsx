import Navbar from '@/components/navbar';
import React from 'react'

function EventManagmentLayout({
    children,
  }: {
    children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col space-y-36 px-0 md:px-10 pb-20 bg-card'>
        {/* Navbar */}
        <Navbar />
        <div className="w-full">{children}</div>
    </section>
  )
}

export default EventManagmentLayout