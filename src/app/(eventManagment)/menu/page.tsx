import Dot from '@/components/animata/background/dot';
import ImageBlendHeading from '@/components/event-arrangment/menu/ImageBlendHeading';
import ShiftTabMenus from '@/components/event-arrangment/menu/ShiftTabMenus';
import React from 'react';

// Data
import { 
  continentalFoodMenu1,
  continentalFoodMenu2,
  continentalFoodMenu3,
  formalTeaGatheringMenu1, 
  formalTeaGatheringMenu2, 
  formalTeaGatheringMenu3, 
  freshFromKitchenMenu1, 
  freshFromKitchenMenu2, 
  freshFromKitchenMenu3, 
  TraditionalDesiFoodMenu1, 
  TraditionalDesiFoodMenu2, 
  TraditionalDesiFoodMenu3 
} from '@/utils/EventArrangmentData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Event Arrangement | Menus & Prices",
  description:
    "Explore our diverse menu selections, featuring Fresh From Kitchen, Traditional Desi Food, Continental Style Food, and Formal Tea Gathering menus. Discover detailed dish descriptions and pricing to perfectly plan your event.",
  keywords: [
    "event arrangement",
    "menus",
    "food menus",
    "dish details",
    "menu prices",
    "fresh from kitchen",
    "traditional desi food",
    "continental style food",
    "formal tea gathering",
    "catering",
    "event catering",
  ],
};

function Page() {
  // Prepare data for the menu page
  const menuPageData = [
    {
      key: 'freshFromKitchen',
      firstLetter: 'Fresh',
      secondLetter: 'From',
      thirdLetter: 'Kitchen',
      data: [
        freshFromKitchenMenu1,
        freshFromKitchenMenu2,
        freshFromKitchenMenu3,
      ],
    },
    {
      key: 'TraditionalDesiFood',
      firstLetter: 'Traditional',
      secondLetter: 'Desi',
      thirdLetter: 'Food',
      data: [
        TraditionalDesiFoodMenu1,
        TraditionalDesiFoodMenu2,
        TraditionalDesiFoodMenu3,
      ],
    },
    {
      key: 'ContinentalStyleFood',
      firstLetter: 'Continental',
      secondLetter: 'Style',
      thirdLetter: 'Food',
      data: [
        continentalFoodMenu1,
        continentalFoodMenu2,
        continentalFoodMenu3,
      ],
    },
    {
      key: 'FormalTeaGathering',
      firstLetter: 'Formal',
      secondLetter: 'Tea',
      thirdLetter: 'Gathering',
      data: [
        formalTeaGatheringMenu1,
        formalTeaGatheringMenu2,
        formalTeaGatheringMenu3,
      ],
    },
  ];

  return (
    <section className="flex flex-col min-h-screen mt-3 sm:mt-20">
      {menuPageData.map((menuItem) => (
        <div key={menuItem.key} className="flex flex-col space-y-10 sm:space-y-14 mb-16 sm:mb-24">
          <ImageBlendHeading
            firstLetter={menuItem.firstLetter}
            secondLetter={menuItem.secondLetter}
            thirdLetter={menuItem.thirdLetter}
          />

          <Dot
            color="#7d7d7d"
            className="flex flex-col items-center text-center p-4 sm:p-10"
          >
            <ShiftTabMenus
              tabOneData={menuItem.data[0]}
              tabTwoData={menuItem.data[1]}
              tabThreeData={menuItem.data[2]}
            />
          </Dot>
        </div>
      ))}
    </section>
  );
}

export default Page;
