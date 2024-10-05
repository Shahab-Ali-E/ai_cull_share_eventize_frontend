"use client"

import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import { Label } from '../ui/label';
import GradientButton from '../ui/gradient-button'
import { useRouter } from 'next/navigation'
import { LOGOUT_URL } from '@/constants/ApiUrls';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export interface UserProfileDropDownProps {
    profileImage: string, 
    userEmail: string, 
    userName: string, 
    profileFallBack?: string
  }

function UserProfileDropDown({ profileImage, userEmail, userName, profileFallBack = "" }: UserProfileDropDownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    
    const handleLogout = async () => {
        try {
        const response = await fetch(LOGOUT_URL, {
            method: 'GET',
            credentials: 'include',
        });
        
        const jsonResponse = await response.json();
        if (response.status === 200) {
            window.location.href = "/"
        } else {
            console.error("Error logging out", jsonResponse);
        }
        } catch (error) {
        console.error("Error occurred", error);
        }
    };
  return (
    <DropdownMenu
        onOpenChange={(open) => setIsDropdownOpen(open)} 
    >
        <DropdownMenuTrigger asChild>
        <div className='flex flex-row items-center space-x-1 cursor-pointer'>
            <Avatar className="ml-4 w-[52px] h-12 rounded-xl overflow-hidden">
                <AvatarImage src={profileImage} alt='User picture' />
                <AvatarFallback className='text-primary border border-primary'>{profileFallBack}</AvatarFallback>
            </Avatar>
            {isDropdownOpen ? (
            <RiArrowDropUpLine className='h-8 w-8 text-primary' />
            ) : (
            <RiArrowDropDownLine className='h-8 w-8 text-primary' />
            )}
        </div>
        </DropdownMenuTrigger>

        {/* Dropdown content */}
        <DropdownMenuContent className="flex flex-col bg-primary-foreground items-center justify-center text-center p-7 space-y-4 w-full">
        <DropdownMenuItem className='flex flex-row xl:flex-col lg:flex-col md:flex-col items-center space-y-4 sm:space-x-5 focus:border-none focus:outline-none'>
            <Avatar className="h-16 w-16 xl:h-32 xl:w-32 lg:h-32 lg:w-32 md:h-28 md:w-28 rounded-full">
                <AvatarImage src={profileImage} alt='User picture' />
                <AvatarFallback className='text-primary'>{profileFallBack}</AvatarFallback>
            </Avatar>
            <Label className='font-medium text-lg text-primary'>{userEmail}</Label>
        </DropdownMenuItem>


        {/* Full-width hr with proper alignment */}
        <hr className='bg-card-foreground h-[2px] w-full m-0 p-0' />

        {/* "View Profile" option with zoom effect for all devices except mobile */}
            <DropdownMenuItem 
            onClick={()=>router.push('/profile')}
            className='hidden sm:block cursor-pointer text-primary font-semibold bg-gray-200 dark:bg-card focus:border-none focus:outline-none w-full p-3 rounded-md transition-transform transform hover:scale-105 hover:bg-opacity-80 ease-in-out duration-300'>
                View Profile
            </DropdownMenuItem>

        {/* Mobile-specific additional options */}
        <DropdownMenuItem 
        className='block sm:hidden space-y-2 mt-4 w-full text-center focus:border-none focus:outline-none p-2 rounded-md'>          
            <Label 
            className='block text-primary w-full bg-card p-5 rounded-md cursor-pointer'
            onClick={()=>router.push('/contact_us')}
            >
            Contact Us
            </Label>
            <Label 
            className='block text-primary w-full bg-card p-5 rounded-md cursor-pointer'
            onClick={()=>router.push('/help')}
            >
            Help
            </Label>
            <Label 
            className='block text-primary w-full bg-card p-5 rounded-md cursor-pointer'
            onClick={()=>router.push('/Profile')}
            >
            Profile
            </Label>      
        </DropdownMenuItem>

        <GradientButton
            className='w-30 h-10 font-extrabold text-lg'
            onClick={handleLogout}
        >
            Logout
        </GradientButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfileDropDown