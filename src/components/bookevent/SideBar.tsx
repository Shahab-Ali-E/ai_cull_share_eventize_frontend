import React from 'react';
import { Label } from '../ui/label';
import Image from 'next/image';

import sideImage from '@/images/aside-step-image.svg';

function SideBar() {
  return (
    <aside className="relative flex w-full rounded-xl text-2xl overflow-hidden">
      {/* Background Image */}
      <Image
        src={sideImage}
        alt="aside-image"
        height={400}
        width={200}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col p-8 space-y-6">
        {/* Step 1 */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-[#B089FE] h-10 w-10 flex items-center justify-center text-primary text-base font-bold">
            1
          </div>
          <div>
            <Label className="text-sm text-muted-foreground uppercase">
              Step 1
            </Label>
            <Label className="block text-base font-semibold text-primary-foreground">
              Personal Information
            </Label>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-transparent border border-primary-foreground h-10 w-10 flex items-center justify-center text-primary-foreground text-base font-bold">
            2
          </div>
          <div>
            <Label className="text-sm text-muted-foreground uppercase">
              Step 2
            </Label>
            <Label className="block text-base font-semibold text-primary-foreground">
              Event Details
            </Label>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-transparent border border-primary-foreground h-10 w-10 flex items-center justify-center text-primary-foreground text-base font-bold">
            3
          </div>
          <div>
            <Label className="text-sm text-muted-foreground uppercase">
              Step 3
            </Label>
            <Label className="block text-base font-semibold text-primary-foreground">
              Select Destination
            </Label>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-transparent border border-primary-foreground h-10 w-10 flex items-center justify-center text-primary-foreground text-base font-bold">
            4
          </div>
          <div>
            <Label className="text-sm text-muted-foreground uppercase">
              Step 4
            </Label>
            <Label className="block text-base font-semibold text-primary-foreground">
                Additional Information
            </Label>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-transparent border border-primary-foreground h-10 w-10 flex items-center justify-center text-primary-foreground text-base font-bold">
            5
          </div>
          <div>
            <Label className="text-sm text-muted-foreground uppercase">
              Step 5
            </Label>
            <Label className="block text-base font-semibold text-primary-foreground">
                Review and Submit
            </Label>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
