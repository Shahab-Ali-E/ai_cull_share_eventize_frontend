"use client";

import Image from 'next/image';
import React, { useState } from 'react'; // Import useState for toggling icon
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdHelpCircle } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"; // Import RiArrowDropUpLine icon
import logo from '../../images/logo.png';
import { ThemeToggle } from '../theme-toggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Label } from '../ui/label';
import GradientButton from '../ui/gradient-button';

//logout url
import { LOGOUT_URL } from '@/constants/ApiUrls';



// Types for header or navbar of culling module
interface CullingDashboardHeaderProps{
  profileImage: string, 
  userEmail: string, 
  userName: string, 
  profileFallBack?: string
}

function CullingDashboardHeader({ profileImage, userEmail, userName, profileFallBack = "" }: CullingDashboardHeaderProps) {
  
  // State to track whether the dropdown is open or closed
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //calling api for logout
  const handleLogout = async () => {
    try{
      const response = await fetch(LOGOUT_URL, {
        method: 'GET',
        credentials: 'include',
      });
    
      const jsonResponse = await response.json();
      if (response.status === 200) {
        console.log("Logout successful", jsonResponse);
        window.location.href = "/"
      } else {
        console.error("Error logging out", jsonResponse);
      }
    }
    catch(error){
      console.log("error occur",error)
    }
  };

  return (
    <div className='flex items-center justify-between p-1 shadow-md shadow-gray-400 dark:shadow-black bg-secondary'>  
      {/*website logo  */}
      <div className='flex items-center'>
        <Image src={logo} alt='logo-here' height={30} width={100} />
      </div>

      {/* the user icons and some other like contact us , help etc container  */}
      <div className='flex items-center space-x-5 pr-5'>
        {/* help circle icon */}
        <IoMdHelpCircle className='h-7 w-7 text-primary hover:opacity-70' /> 
        <a href="#" className='text-primary text-base font-semibold hover:opacity-70'>Contact Us</a>
        <a href="#" className='text-primary text-base font-semibold hover:opacity-70'>Help</a>
        {/* theme toggle button */}
        <ThemeToggle className='bg-primary-foreground' />

        {/* user icon and drop down of user profile */}
        <DropdownMenu
          onOpenChange={(open) => setIsDropdownOpen(open)} // Update state on dropdown open/close
        >
          <DropdownMenuTrigger asChild>
           
            <div className='flex flex-row items-center space-x-1 cursor-pointer'>
              <Avatar className="ml-4 w-[52px] h-12 rounded-md">
                <AvatarImage src={profileImage} alt='User picture' />
                <AvatarFallback className='text-primary border border-primary'>{profileFallBack}</AvatarFallback>
              </Avatar>
              {/* Toggle between the dropdown arrow down and up icons based on state */}
              {isDropdownOpen ? (
                <RiArrowDropUpLine className='h-8 w-8 text-primary' /> // Up arrow when open
              ) : (
                <RiArrowDropDownLine className='h-8 w-8 text-primary' /> // Down arrow when closed
              )}
            </div>
          </DropdownMenuTrigger>
          
          {/* user drop down profile */}
          <DropdownMenuContent className="flex flex-col bg-primary-foreground items-center justify-center p-7 mr-10 space-y-4">
            <Avatar className="h-40 w-40 rounded-full">
              <AvatarImage src={profileImage} alt='User picture' />
              <AvatarFallback className='text-primary'>{profileFallBack}</AvatarFallback>
            </Avatar>
            <Label className='font-medium text-lg text-primary'>{userName}</Label>
            <Label className='font-medium text-lg text-primary'>{userEmail}</Label>
            <GradientButton 
            className='w-30 h-10 font-extrabold text-lg'
            onClick={handleLogout}
            >Logout
            </GradientButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default CullingDashboardHeader;
