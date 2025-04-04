import create_workspace_gif from "@/images/AlgoCull-unscreen.gif"
import { Testimonial } from "@/components/animata/container/scrolling-testimonials"

// smart culling slider images
import image1 from '@/images/detect_blur.jpg'
import image2 from '@/images/similar.jpg'
import image3 from '@/images/closed_eyes.jpg'
import image4 from '@/images/identify-key-faces.jpg'


import { BaseDataType, cullingStepsDataProps } from "@/@types/Types";

// how to start culling guide data 
export const cullingStepsData:cullingStepsDataProps[] = [
    {
      title: 'Create Workspace',
      steps: [
        'Click on "Create Workspace".',
        'Enter a unique name, then click "Create".',
        'You can create multiple workspaces.'
      ],
      gif: create_workspace_gif
    },
    {
      title: 'Import Photos',
      steps: [
        'Click on "Import Photos".',
        'Select the folder where your photos are located.',
        'Click "Import" to add the photos to your workspace.'
      ],
      gif: create_workspace_gif
    },
    {
      title: 'Cull Photos',
      steps: [
        'Click on "Start Culling".',
        'Review the photos and remove unwanted ones.',
        'Click "Save" to finalize the selection.'
      ],
      gif: create_workspace_gif
    },
    {
      title: 'Export Photos',
      steps: [
        'Click on "Export".',
        'Choose the format and destination folder.',
        'Click "Export" to save your selected photos.'
      ],
      gif: create_workspace_gif
    }
];


// smart culling slider images meta data
export const smartCullSliderImages: BaseDataType[] = [
    {
      id: 1,
      src: image1,
      description: 'Separate blurs',
    },
    {
      id: 2,
      src: image2,
      description: 'Identify similar images',
    },
    {
      id: 3,
      src: image3,
      description: 'Detect closed eyes',
    },
    {
      id: 4,
      src: image4,
      description: 'Extract faces from images',
    }
]


//  this is the data for marquee which placed at very bottom in /culling-home page
export const trustedByPhotographerData:Testimonial[] = [
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
      image: 'https://plus.unsplash.com/premium_photo-1717529137991-510ad3be15d9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe.'
    },
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Paul A'
    },
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
      image: 'https://images.unsplash.com/photo-1560298803-1d998f6b5249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jeff Roe'
    },
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
      image: 'https://images.unsplash.com/photo-1518287010730-4386819bf3e9?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Mex Q'
    },
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Cristina W'
    },
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
      image: 'https://images.unsplash.com/photo-1581092916357-5896ebc48073?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Lanna Del Rey'
    },
    {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
      image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Paul Logan'
    }
]
