"use client";
import { useEffect, useRef } from 'react';

//components
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import GradientButton from '@/components/ui/gradient-button';
import CustomDropdownMenu, {DropDownItemType} from '@/components/Culling/CustomDropDown';

//icons
import { RiSearch2Line } from 'react-icons/ri';

//lottie
import { LazyLottie } from '@/components/lazy-lottie-load';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




function CullingDashboard() {
  //use ref for div ref to add lottie animation to it
  // const rocketAnimationContainer = useRef<HTMLDivElement | null>(null);
  // Create a client
  const queryClient = new QueryClient();

  const sortByAZ = ():void => {
    // Handle A-Z sorting (API call can be placed here)
    console.log("Sorting A-Z");
  };

  const sortByNewest = ():void=>{
    //Handle Newest sorting (API call can be placed here)
    console.log("Sorting Newest")
  }

  const sortByOldest = ():void=>{
    //Handle Oldest sorting (API call can be placed here)
    console.log("Sorting Oldest")
  }

  //defining drop down menu item for sort by
  const SortByItems:DropDownItemType[] = [
    {label:"A - Z", onClick: sortByAZ},
    {label:"Newest", onClick: sortByNewest},
    {label:"Oldest", onClick: sortByOldest}
  ]

  //useEffect for starting get-started-rocket animation
  // useEffect(()=>{
  //   if(rocketAnimationContainer.current){
  //     lottie.loadAnimation({
  //       container:rocketAnimationContainer.current,
  //       renderer:'svg',
  //       loop:true,
  //       autoplay:true,
  //       path:'../../../images/animated-icons/Rocket-launch.json'
  //     });
  //   }
  // },[])

  return (
    <div className='flex flex-col bg-foreground p-5'>
      <div className='flex flex-row pb-5 border-b border-muted-foreground'>

        {/* my cullings and search box */}
        <div className='flex flex-col space-y-4 w-1/2'>
          <Label className='font-bold text-primary text-xl xl:text-3xl lg:text-3xl md:text-2xl'>My Cullings</Label>
          <Input
            placeholder='search in culling'
            icon={<RiSearch2Line size={15} />}
            className='bg-gray-200 dark:bg-primary-foreground text-primary xl:w-[23rem] lg:w-80 md:w-72 text-base py-6'
          />
        </div>

        {/* create event button and some setting buttons */}
        <div className='flex flex-row items-end justify-end space-x-6 w-1/2'>
          {/* drop down for sorting events */}
          <div>
            <CustomDropdownMenu 
              buttonLabel='Sort By'
              dropdownItems={SortByItems}
            />
          </div>
          {/* create event button */}
          <div>
            <GradientButton className='xl:block xl:w-44 xl:h-10 lg:block lg:w-40 lg:h-10 md:hidden sm:hidden'>create event</GradientButton>
          </div>
        </div>
      </div>

      {/* body section of the page where the culling's will show  */}
      <div className='flex flex-col '>
        {/* get started rocket animation will only render when there is not culling found */}
        <div className='flex flex-col justify-center items-center'>
          {/* rocket animation */}

          <div className='ml-5'>
            <QueryClientProvider client={queryClient}>
              <LazyLottie
                getAnimationData={() => import('../../../images/animated-icons/Rocket-launch.json')}
                loop
                id="empty-box"
                className='h-56 w-56'
              />
            </QueryClientProvider>
          </div>
          {/* get Started text */}
          <div className="flex flex-col text-center space-y-4">
            <Label className="text-4xl font-bold text-primary">Get Started!</Label>
            <Label className="text-base font-semibold text-primary">
              <span>✨ Elevate your images effortlessly!<br/></span> 
              <span>Simply create a culling workspace, upload your images, and let our AI take care of the rest. 💡</span> 
            </Label>
          </div>

          {/* create event Button */}
          <div className='mt-10'>
            <GradientButton className='xl:w-52 xl:h-14 lg:w-48 lg:h-12 md:w-44 md:h-12'>create event</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CullingDashboard;
