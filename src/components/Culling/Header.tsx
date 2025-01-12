'use client';

import Image from 'next/image';
import { IoMdHelpCircle } from "react-icons/io";
import logo from '../../images/logo.png';
import { ThemeToggle } from '../theme-toggle';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { Skeleton } from '../ui/skeleton';

function CullingDashboardHeader() {
  const {isLoaded} = useUser();

  return (
    <div className='flex items-center justify-between p-1 shadow-md shadow-gray-300 dark:shadow-card bg-inherit'>  
      
      {/* Website logo */}
      <div className='flex items-center'>
        <Image src={logo} alt='logo-here' height={28} width={68} />
      </div>

      {/* User icons and other elements */}
      <div className='flex items-center space-x-5 pr-5'>
        {/* Show contact us and help for md and larger */}
        <div className="hidden md:flex items-center space-x-5">
          <IoMdHelpCircle className='h-7 w-7 text-primary hover:opacity-70' /> 
          <a href="#" className='text-primary text-base font-semibold hover:opacity-70'>Contact Us</a>
          <a href="#" className='text-primary text-base font-semibold hover:opacity-70'>Help</a>
        </div>

        {/* Theme toggle button */}
        <ThemeToggle className='bg-primary-foreground' />

        {/* Check if the user was authenticated, then show their profile*/}
        {/* if sign in then show user profile */}
        {isLoaded ? (
          <div>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    rootBox:
                      "bg-headingtext hover:scale-105 text-primary rounded-full p-1 transition-all",
                    userButtonAvatarBox: "h-9 w-9",
                    userButtonPopoverFooter: "hidden",

                    userButtonPopoverCard: "border border-muted",
                    userButtonPopoverMain: "bg-card text-primary p-3",
                    userPreviewSecondaryIdentifier: "text-muted-foreground",

                    // popover styling
                    userButtonPopoverActions:
                      "flex-col-reverse gap-2 space-y-2",
                    userButtonPopoverActionButton:
                      "bg-primary-foreground text-primary hover:text-primary hover:bg-muted rounded-xl",
                  },
                }}
                userProfileMode="navigation"
                userProfileUrl="/user-profile"
              >
                <UserButton.MenuItems></UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        ) : (
          <Skeleton className="h-10 w-10 rounded-full" />
        )}
        
      </div>
    </div>
  );
}

export default CullingDashboardHeader;
