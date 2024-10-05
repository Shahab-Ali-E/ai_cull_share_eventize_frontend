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
        <DropdownMenuTrigger asChild className='shadow-md hover:bg-card bg-primary-foreground xl:w-28'>
          <Button className='text-primary'>
            {buttonLabel}
            {/* Toggle icon when user opens and closes drop down */}
            {isDropdownOpen ? (
              <RiArrowDropUpLine className='ml-1 h-20 w-20 text-primary'/> // Up arrow when open
            ) : (
              <RiArrowDropDownLine className='ml-1 h-20 w-20 text-primary' /> // Down arrow when closed
            )}
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu items */}
        <DropdownMenuContent className='bg-primary-foreground mt-1 rounded-md xl:w-28 text-center p-1'>
          {dropdownItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className='cursor-pointer text-primary hover:bg-card focus:border-none focus:outline-none p-2 rounded-md'
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
