import React from 'react';
import Header from '@/components/event-arrangment/bookevent/Header';
import SideBar from '@/components/event-arrangment/bookevent/SideBar';


export default function BookEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // getting user information
  
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center space-y-10">
      {/* header */}
      <div className='text-center'>
        <Header
          title="Book Now!"
          subtitle="Fill all the infor..."
        />
      </div>
      
      {/* form */}
      <div className="flex flex-col p-5 min-h-screen w-full xl:w-[80%] lg:w-[80%] md:w-full space-x-0 space-y-5 sm:space-y-0 sm:space-x-5 sm:flex-row">
        {/* side steps components */}
          <div className='flex flex-shrink-0'>
            <SideBar />
          </div>
          {/* each step form */}
          <div className='flex self-center sm:self-auto p-5 sm:p-16 bg-card shadow-lg shadow-accent rounded-2xl w-full border-2 dark:border-none'>
            {children}
          </div>
      </div>
    </div>
  );
}