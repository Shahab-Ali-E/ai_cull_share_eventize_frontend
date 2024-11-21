"use client";

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

//button
import { Button } from '../ui/button';

//icons
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';

export type DropDownItemType = {
    label: string;
    onClick : ()=>void;
}

interface CustomDropdownMenuProps{
    buttonLabel:string;
    dropdownItems: DropDownItemType[];
}

const CustomDropdownMenu: React.FC<CustomDropdownMenuProps> = ({ buttonLabel, dropdownItems }) => {
  const [isDropdownOpen, setisDropdownOpen] = useState(false);

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setisDropdownOpen(open)}>
        {/* Sort by button */}
        <DropdownMenuTrigger asChild className='shadow-md hover:bg-[#111111] bg-card w-24 xl:w-28 lg:w-24 md:w-20'>
          <Button className='text-primary text-sm'>
            {buttonLabel}
            {/* Toggle icon when user opens and closes drop down */}
            {isDropdownOpen ? (
              <RiArrowDropUpLine className='h-10 w-14 ml-1 xl:h-20 xl:w-20 lg:h-20 lg:w-20 md:h-16 md:w-16 text-primary'/> // Up arrow when open
            ) : (
              <RiArrowDropDownLine className='h-10 w-14 ml-1 xl:h-20 xl:w-20 lg:h-20 lg:w-20 md:h-16 md:w-16 text-primary' /> // Down arrow when closed
            )}
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu items */}
        <DropdownMenuContent className='bg-card mt-1 rounded-md xl:w-28 text-center p-1 z-10 '>
          {dropdownItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className='cursor-pointer text-primary hover:bg-[#111111] focus:border-none focus:outline-none p-2 rounded-md'
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomDropdownMenu;
