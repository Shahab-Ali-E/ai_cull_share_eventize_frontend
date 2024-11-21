import React from 'react';
import Header from '@/components/bookevent/Header';
import SideBar from '@/components/bookevent/SideBar';


export default function BookEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center space-y-10 border-2 border-white">
      {/* hader */}
      <div className='text-center'>
        <Header
          title="Book Now!"
          subtitle="Fill all the infor..."
        />
      </div>
      
      {/* form */}
      <div className="flex flex-col p-5 border-2 border-white min-h-screen w-[68%] sm:flex-row bg-card rounded-xl">
        {/* side steps components */}
          <div className='flex flex-shrink-0'>
            <SideBar />
          </div>
          {/* each step form */}
          <div className='flex ml-10 mr-10 pt-14 w-full'>
            {children}
          </div>
      </div>
    </div>
  );
}