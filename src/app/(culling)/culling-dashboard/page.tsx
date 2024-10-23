import { Suspense } from 'react';

//components
import { Label } from '@/components/ui/label';
import CullingDashboardPage from './CullingDashboardPage';
import SortByDropDown from './SortByDropDown';
import Search from './Search';
import Await from './Await';
import CreateCullingWorkSpace from '@/components/Culling/CreateWorkSpace';

//loading skeleton
import { WorkSpacesSkeleton } from '@/components/Culling/WorkSpaceSkeleton';

//api
import { getAllWorkSpaces } from '@/lib/actions/GetUserWorkSpaces';


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
  // calling the API from backend to get workspaces
  const workSpacesPromise = getAllWorkSpaces({sort_order:searchParams.sort_order, sort_by:searchParams.sort_order, search:searchParams.search});

  return (
    <section className="flex flex-col p-5 min-h-screen overflow-y-auto">
      <div className="flex flex-row pb-5 border-b border-muted-foreground">
        {/* My cullings and search box */}
        <div className="flex flex-col space-y-4 w-1/2">
          <Label className="font-bold text-primary text-xl xl:text-3xl lg:text-3xl md:text-2xl">
            My Cullings
          </Label>
          {/* for searching workspace */}
          <Search />
        </div>
        {/* Create event button */}
        <div className="flex flex-row items-end justify-end space-x-6 w-1/2">
          {/* sort by button */}
          <SortByDropDown />

          {/* create culling workspace */}
          <CreateCullingWorkSpace />
        </div>
      </div>
      {/* rest of culling dashboard page */}
      <div className="flex flex-col p-5 min-h-screen overflow-y-auto">
        <Suspense fallback={<WorkSpacesSkeleton />}>
          <Await promise={workSpacesPromise}>
            {
              ({data})=>(<CullingDashboardPage workSpaces={data}/>)
            }
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default CullingDashboard;
