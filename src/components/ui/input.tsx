'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {

    //state for handling icon show and hide
    const[hasText, setHasText] = useState<boolean>(false)

    //text input handler function
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      setHasText(e.target.value.length > 0)
    }

    return (
      <div className="relative flex items-center">
        {!hasText && icon && (
          <span className="absolute left-3 text-primary pl-2">
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-10 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            icon && !hasText? "pl-12" : "pl-5",
            className
          )}
          onChange={handleInputChange}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
