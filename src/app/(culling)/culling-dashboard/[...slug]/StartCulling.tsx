import CullingTimelineProgress from '@/components/Culling/WorkSpaceComponents/CullingTimelineProgress'
import React from 'react'

function StartCulling() {
  const cullingData = [
      { id: "1", title: "Getting your images" },
      { id: "2", title: "Blur images separation"},
      { id: "3", title: "Closed eye images separation" },
      { id: "4", title: "Duplicate images separation" },
      { id: "5", title: "Finalizing your culling" },
  ];
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <CullingTimelineProgress 
            title='Culling Progress'
            events={cullingData}
        />
    </div>
  )
}

export default StartCulling