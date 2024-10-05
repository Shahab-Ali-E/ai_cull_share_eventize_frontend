import DreamEventSlider from '@/components/Home/dreamEventSlider';
import ImageCard from '@/components/Home/imageGlowingCard';
import NavBar from '@/components/Home/navBar';
import Services from '@/components/Home/services';
import Slider from '@/components/Home/slider';  
import image_1 from "@/images/smart-culling-slider.jpeg"
import sliderImagesMetaData from '@/utils/sliderImages';

const Home = () => {
  return (
    <div className='flex-1 flex-col items-center bg-primary-foreground'>
        {/* nav bar */}
        <NavBar />
      
        {/* Slider with full height but not removed from document flow */}
        <div className='w-full relative '>
          <Slider slides={sliderImagesMetaData[0]} />
        </div>

        {/*------------- Content after the slider ------------------*/}
        <div className='text-primary flex flex-col p-20 space-y-12'>
          <div className='flex justify-center'>
            <p className='text-base font-bold xl:text-4xl lg:text-2xl md:text-lg'>What sets us apart</p>
          </div>
        
          {/* 1st part Event managment */}
          <div className='flex flex-wrap items-center content-center p-0 xl:p-14 lg:p-14 md:p-10 xl:flex-row xl:flex-nowrap lg:flex-row lg:flex-nowrap md:flex-row md:flex-nowrap space-x-10'>
            <div className='flex-grow p-4 xl:p-10 lg:p-10 md:p-3'>
              <ImageCard 
                image_path={image_1}
              />
            </div>
            <div className='flex-grow'>
              <Services 
                mainHeading='01'
                textOverHeading='From Pakistan,'
                description='to global hotspots, plan your dream event with us. We arrange every type of event - concerts, weddings, parties, and more - in exotic locales worldwide. Let us handle every detail while you enjoy unforgettable celebrations in breathtaking locations!'
              />
            </div>
          </div>

          {/* 2nd part Automate Culling */}      
          <div className='flex flex-wrap items-center content-center p-0 xl:p-14 lg:p-14 md:p-10 xl:flex-row xl:flex-nowrap lg:flex-row lg:flex-nowrap md:flex-row md:flex-nowrap space-x-10'>
            <div className='flex-grow order-1 xl:order-2 lg:order-2 md:order-2 p-4 xl:p-10 lg:p-10 md:p-3'>
              <ImageCard 
                image_path={image_1}
              />
            </div>
            <div className='flex-grow order-2 xl:order-1 lg:order-1 md:order-1'>
              <Services 
                mainHeading='02'
                textOverHeading='Automate Culling,'
                description='Process effortlessly with our Smart Cull feature. Say goodbye to tedious manual sorting as our system swiftly identifies and removes duplicates, blurry shots, and closed-eye photos. Streamline your editing workflow and deliver perfect images to your clients without the hassle!'
              />
            </div>
          </div>


          {/* 3rd part Smart Share*/}
          <div className='flex flex-wrap items-center content-center p-0 xl:p-14 lg:p-14 md:p-10 xl:flex-row xl:flex-nowrap lg:flex-row lg:flex-nowrap md:flex-row md:flex-nowrap space-x-10'>
            <div className='flex-grow p-4 xl:p-10 lg:p-10 md:p-3 '>
              <ImageCard 
                image_path={image_1}
              />
            </div>
            <div className='flex-grow'>
              <Services 
                mainHeading='03'
                textOverHeading='Smart Share,'
                description="Improve client experience by providing secure access to photos via facial recognition. Create personalized event galleries and share them with QR codes. Customers can view their photos from anywhere, offering convenience and peace of mind."
              />
            </div>
          </div>
        </div>

        {/* -----------------My Services Sliders------------------------ */}
        <div className='text-primary flex justify-center'>
          {/* Event management slider */}
          <div className='flex flex-col justify-center items-center p-5'>
            <p className='pt-10 pb-16 md animate-fade-in font-bold m-2 sm:text-[22px] md:text-[22px] lg:text-[25px] xl:text-[27px]'>{`Real simple. Real quick. Features that you'll love`}</p>
            <DreamEventSlider 
              images={sliderImagesMetaData[2]}
            />
          </div>
          
      
        </div>
    </div>
  );
};

export default Home;
