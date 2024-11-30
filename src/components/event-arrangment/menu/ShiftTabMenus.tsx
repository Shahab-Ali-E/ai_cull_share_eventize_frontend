'use client';

import React, { useState } from 'react'
import FluidTabs from '@/components/animata/card/fluid-tabs';

//icons
import { NotebookText } from "lucide-react";
import FoodCard from './FoodCard';
import { Label } from '@/components/ui/label';


import { detailMenuCardType } from '@/@types/Types';

function ShiftTabMenus({tabOneData, tabTwoData, tabThreeData}:{tabOneData:detailMenuCardType, tabTwoData:detailMenuCardType, tabThreeData:detailMenuCardType}) {

    // tabs data
    const tabs = [
      {
        id: "menu1",
        label: "Menu 1",
        icon: <NotebookText size={18} />,
      },
      {
        id: "menu2",
        label: "Menu 2",
        icon: <NotebookText size={18} />,
      },
      {
        id: "menu3",
        label: "menu3",
        icon: <NotebookText size={18} />,
      },
    ];

    const [activeTab, setActiveTab] = useState<string>("menu1");

    // switch for rendering the menu card base on menu1 menu2 and menu3
    const renderCardData = () => {

        switch(activeTab){
            case "menu1":
                return <FoodCard data={tabOneData}  />;
            case "menu2":
                return <FoodCard data={tabTwoData}  />;
            case "menu3":
                return <FoodCard data={tabThreeData} />;
            default:
                return <FoodCard data={tabOneData}  />;
        }
    }


  return (
    <div className='flex flex-col w-full text-primary'>
        <div className='flex flex-col space-y-4 sm:space-y-8'>
            {/* discover menu */}
            <Label className='text-3xl sm:text-5xl font-semibold'>
                Discover Menu
            </Label>

            {/* shift/ fluid tabs */}
            <FluidTabs 
                tabs={tabs}
                onTabChange={(tabid)=>setActiveTab(tabid)}
            />
        </div>

        {/* FoodCard */}
        <div>
            {renderCardData()}
        </div>
    </div>
  )
}

export default ShiftTabMenus