import CorporateEventCard from '@/components/event-arrangment/gallery/corporate-event/CorporateEventCard'
import RevelHeading from '@/components/RevelHeading'
import { corporateEventsData } from '@/utils/EventArrangmentData'
import React from 'react'

function Page() {
  return (
    <section className='flex flex-col min-h-screen'>
        <div className='flex flex-col mt-0 sm:mt-10 space-y-0 sm:space-y-24 justify-center items-center'>
            {/* heading */}
            <RevelHeading
                heading="Corporate Event"
                placeholderColor="#ff4446"
                description="We specialize in organizing exceptional corporate events tailored to your needs. From government conferences and business gatherings to grand product launches and fully customized experiences, our expert team ensures every detail is flawlessly executed to leave a lasting impression."
            />

        </div>

        {/* corporate events */}
        <div className="flex flex-col">
            {
                corporateEventsData.map((data, index) => (
                    <div key={index}>
                        <CorporateEventCard 
                            heading={data.heading}
                            description={data.description}
                            src={data.src}
                        />
                        {/* Add space before <hr> */}
                        <hr className={`bg-primary h-[2px] m-10 sm:m-20 ${index === corporateEventsData.length - 1 ? 'hidden' : ''}`} />
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Page;
