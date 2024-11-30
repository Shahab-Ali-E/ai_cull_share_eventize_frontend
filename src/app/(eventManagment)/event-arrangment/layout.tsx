import React from 'react'

function EventManagmentHomeLayout({
    children,
  }: {
    children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
       {children}
    </div>
  )
}

export default EventManagmentHomeLayout