import { StaticImageData } from 'next/image'

// main slider images
import image1 from '@/images/event-management-slider.jpg'
import image2 from '@/images/smart-culling-slider.jpeg'
import image3 from '@/images/smart-share-slider.jpeg'

// event management slider images
import image4 from '@/images/smart-share-slider.jpeg'
import image5 from '@/images/smart-share-slider.jpeg'
import image6 from '@/images/smart-share-slider.jpeg'
import image7 from '@/images/smart-share-slider.jpeg'
import image8 from '@/images/smart-share-slider.jpeg'

// smart culling slider images
import image9 from '@/images/detect_blur.jpg'
import image10 from '@/images/similar.jpg'
import image11 from '@/images/closed_eyes.jpg'
import image12 from '@/images/identify-key-faces.jpg'

export type sliderImages = {
  id: string;
  src: StaticImageData;
  description: string;
}

const mainSliderImages: sliderImages[] = [
  {
    id: '1',
    src: image1,
    description: 'Event Management: Effortlessly organize any event, from birthday parties to weddings and concerts, with our advanced event management platform',
  },
  {
    id: '2',
    src: image2,
    description: 'Smart Culling: Automatically filter out, closed-eye blurred and duplicate images with a simple steps, check out more here',
  },
  {
    id: '3',
    src: image3,
    description: 'Smart Share: Share images effortlessly with facial recognition, Recipients get a QR code access their images, and download them',
  }
]

// event management slider images meta data
const eventManagementSliderImages: sliderImages[] = [
  {
    id: '1',
    src: image4,
    description: 'Efficient Scheduling: Keep your event schedule organized and ensure everything runs smoothly.',
  },
  {
    id: '2',
    src: image5,
    description: 'Real-time Updates: Get instant updates on event progress and potential issues.',
  },
  {
    id: '3',
    src: image6,
    description: 'Comprehensive Reporting: Track event success with detailed analytics and insights.',
  },
  {
    id: '4',
    src: image7,
    description: 'Participant Management: Manage attendees and streamline the registration process.',
  },
  {
    id: '5',
    src: image8,
    description: 'Budget Optimization: Control your event budget with real-time financial tracking tools.',
  }
]

// smart culling slider images meta data
const smartCullSliderImages: sliderImages[] = [
    {
      id: '1',
      src: image9,
      description: 'Separate blurs',
    },
    {
      id: '2',
      src: image10,
      description: 'Identify similar images',
    },
    {
      id: '3',
      src: image11,
      description: 'Detect closed eyes',
    },
    {
      id: '4',
      src: image12,
      description: 'Extract faces from images',
    }
]
  

// exporting all slider meta by in an array
const sliderImagesMetaData = [
  mainSliderImages,
  eventManagementSliderImages,
  smartCullSliderImages
]

export default sliderImagesMetaData;
