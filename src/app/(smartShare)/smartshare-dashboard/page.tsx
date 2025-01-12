import { Suspense } from 'react';

//components
import { Label } from '@/components/ui/label';
import SmartShareDashboardPage from './SmartShareDashboardPage';
import SortByDropDown from './SortByDropDown';
import Search from './Search';
import Await from './Await';
import CreateEvent from '@/components/SmartShare/CreateEvent';

//loading skeleton
import EventsSkeleton from '@/components/SmartShare/EventsSkeleton';

//api
import { getAllEvents } from '@/lib/actions/SmartShare/GetEvents';
import StorageUsed from '@/components/StorageUsed';

type SearchParams = {
  sort_order:string|undefined,
  sort_by:string|undefined,
  search:string|undefined
};

const CullingDashboard = async ({
  searchParams
}: {
  searchParams: SearchParams;
}) => {
  // calling the API from backend to get all events
  const eventsPromise = getAllEvents({sort_order:searchParams.sort_order, sort_by:searchParams.sort_order, search:searchParams.search});

  return (
    <section className="flex flex-col p-5 min-h-screen overflow-y-auto">
      <div className="relative flex flex-row pb-5 border-b border-muted-foreground space-x-4">
        {/* Left side: My Cullings label and Search box */}
        <div className="flex flex-col w-auto sm:w-1/3 space-y-4">
          <Label className="font-bold text-primary text-xl xl:text-3xl lg:text-3xl md:text-2xl">
            My Events
          </Label>
          
          {/* Search component */}
          <div className="flex-1">
            <Search />
          </div>
        </div>

        {/* Right side: Sort by and Create Workspace buttons */}
        <div className="absolute right-0 bottom-5 flex items-end justify-end sm:justify-around w-1/2">
          <div className='w-1/2 hidden sm:block'>
            {/* storage bar */}
            <StorageUsed 
              module='smartShare'
            />
          </div>
          
          {/* Sort by button */}
          <SortByDropDown />

          {/* Create culling workspace button, hidden on small screens */}
          <div className="hidden sm:block">
            <div className='flex justify-end items-baseline'>
              <CreateEvent />
            </div>
          </div>
        </div>
      </div>

      {/* rest of culling dashboard page */}
      <div className="flex flex-col relative p-5 min-h-screen overflow-y-auto">
        <Suspense fallback={<EventsSkeleton />}>
          <Await promise={eventsPromise}>
            {
              ({data})=>(<SmartShareDashboardPage Events={data}/>)
            } 
          </Await>
        </Suspense>

        {/* Spacer div to push the CreateCullingWorkSpace component to the bottom */}
        <div className="flex-grow"></div>

        {/* Responsive Create Workspace component at the bottom */}
        <div className="mt-5 flex justify-center visible sm:invisible">
          <CreateEvent />
        </div>
      </div>
    </section>
  );
}

export default CullingDashboard;
