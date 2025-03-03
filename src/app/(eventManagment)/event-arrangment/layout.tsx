import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {  
  title: "Event Arrangement",  
  description: "Discover event arrangement with seamless booking, and insightful event management. Learn how we simplifies organizing, optimizing, and enhancing your events effortlessly.",  
};


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