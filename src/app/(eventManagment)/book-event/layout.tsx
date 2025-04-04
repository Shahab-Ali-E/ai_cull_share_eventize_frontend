import React from 'react';
import Header from '@/components/event-arrangment/bookevent/Header';
import EventFormSideBar from '@/components/event-arrangment/bookevent/EventFormSideBar';


export default function BookEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // getting user information
  
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center space-y-12 pb-32">
      {/* heading */}

      <Header title='Book Event'/>
     
      {/* form */}
      <div className="flex flex-col p-px min-h-screen w-full xl:w-[80%] lg:w-[80%] md:w-full space-x-0 space-y-5 md:space-y-0 md:space-x-8 md:flex-row">
        {/* side steps components */}
          <div className='flex flex-shrink-0'>
            <EventFormSideBar />
          </div>
          {/* each step form */}
          <div className='flex self-center md:self-auto p-5 md:p-16 bg-primary-foreground shadow-md shadow-card rounded-2xl w-full border-2 dark:border-none'>
            {children}
          </div>
      </div>
    </div>
  );
}