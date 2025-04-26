import CullingTimelineProgress from '@/components/Culling/WorkSpaceComponents/CullingTimelineProgress'
import React from 'react'

function StartCulling({workSpaceId, cullingTaskIds}:{workSpaceId:string; cullingTaskIds:string[]}) {
  const cullingData = [
      { id: "1", title: "Getting your images" },
      { id: "2", title: "Blur images separation"},
      { id: "3", title: "Closed eye images separation" },
      { id: "4", title: "Duplicate images separation" },
      { id: "5", title: "Finalizing your culling" },
  ];
  console.log("work space id",workSpaceId)
  return (
    <div className='flex flex-col justify-center items-center mt-5'>
        <CullingTimelineProgress
            workSpaceId={workSpaceId} 
            title='Culling Progress'
            events={cullingData}
            cullingTaskIds={cullingTaskIds}
        />
    </div>
  )
}

export default StartCulling