'use client'

import CulledImageCard from '@/components/Culling/WorkSpaceComponents/CulledImageCard';
import Image from 'next/image';
import React from 'react';

// images
import blur_image from '@/images/detect_blur.jpg';
import closed_eye_image from '@/images/closed_eyes.jpg';
import duplicate_image from '@/images/closed_eyes.jpg';
import fine_collection from '@/images/closed_eyes.jpg';
import useCullingStore from '@/zustand/CullingStore';

function CulledImages() {
  const {currentActiveWorkSpaceData} = useCullingStore();

  const cards = [
    { title: 'Blur Images', Image: <Image src={blur_image} alt="Blurred" className="w-full h-full object-cover" />, href:`/culling-dashboard/${currentActiveWorkSpaceData.id}/Blur` },
    { title: 'Closed Eye Images', Image: <Image src={closed_eye_image} alt="Closed Eye" className="w-full h-full object-cover" />, href:`/culling-dashboard/${currentActiveWorkSpaceData.id}/ClosedEye`  },
    { title: 'Duplicate Images', Image: <Image src={duplicate_image} alt="Duplicate" className="w-full h-full object-cover" />, href:`/culling-dashboard/${currentActiveWorkSpaceData.id}/Duplicate` },
    { title: 'Fine Collection', Image: <Image src={fine_collection} alt="Fine Collection" className="w-full h-full object-cover" />, href:`/culling-dashboard/${currentActiveWorkSpaceData.id}/FineCollection`  },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-col-2 lg:grid-cols-4 xl:grid-col-4 min-h-screen justify-items-center mt-0 sm:mt-16">
      {cards.map((card, idx) => (
        <CulledImageCard key={idx} title={card.title} Image={card.Image} href={card.href} />
      ))}
    </div>
  );
}

export default CulledImages;
