"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

// Button
import { Button } from "./ui/button";

// Icons
import { ChevronDown, ChevronUp } from "lucide-react";

export type DropDownItemType = {
  label: string;
  onClick: () => void;
};

interface DropDownProps {
  buttonLabel: string;
  dropdownItems: DropDownItemType[];
}

const DropDown: React.FC<DropDownProps> = ({ buttonLabel, dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(buttonLabel);

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
        {/* Dropdown trigger button */}
        <DropdownMenuTrigger
          asChild
          className={`rounded-sm shadow-none hover:bg-primary-foreground ${
            isDropdownOpen ? "bg-primary-foreground" : "bg-transparent"
          }`}
        >
          <Button className="text-primary text-sm gap-x-2">
            {selectedLabel} {/* Show the selected label */}
            {isDropdownOpen ? (
              <ChevronUp size={17} className="text-primary" /> // Up arrow when open
            ) : (
              <ChevronDown size={17} className="text-primary" /> // Down arrow when closed
            )}
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu items */}
        <DropdownMenuContent className="bg-primary-foreground mt-1 rounded-md xl:w-28 text-center p-1 z-10">
          {dropdownItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={`cursor-pointer text-primary hover:bg-secondary focus:border-none focus:outline-none p-2 rounded-md text-sm ${
                selectedLabel === item.label ? "bg-muted" : ""
              }`} // Add bg-muted to the selected item
              onClick={() => {
                setSelectedLabel(item.label); // Update the selected label
                item.onClick(); // Trigger the item's onClick handler
              }}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
