import React from 'react';
import Image from 'next/image';

interface ImagePreviewProps{
    imagesUrl:{
        url:string
    }[]
}

function ImagePreview({imagesUrl}:ImagePreviewProps) {

  return (
    <div>
        <h3 className='text-primary'>Image Previews:</h3>
        <div className="flex flex-wrap">
        {imagesUrl.map((images, index:number) => (
            <div key={index} className="p-2">
            <Image
                src={images.url}
                height={200}
                width={200}
                alt={`Image ${index + 1}`}
                className="rounded-lg object-cover h-60 w-60"
                priority={index === 0}
            />
            </div>
        ))}
        </div>
    </div>
  );
}


export default ImagePreview;
