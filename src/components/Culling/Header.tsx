import Image from 'next/image';
import { IoMdHelpCircle } from "react-icons/io";
import logo from '../../images/logo.png';
import { ThemeToggle } from '../theme-toggle';
import UserProfileDropDown, { UserProfileDropDownProps } from '@/components/user-profile';

function CullingDashboardHeader({ profileImage, userEmail, profileFallBack = "" }: UserProfileDropDownProps) {

  return (
    <div className='flex items-center justify-between p-1 shadow-md shadow-gray-400 dark:shadow-black bg-secondary'>  
      
      {/* Website logo */}
      <div className='flex items-center'>
        <Image src={logo} alt='logo-here' height={30} width={100} />
      </div>

      {/* User icons and other elements */}
      <div className='flex items-center space-x-5 pr-5'>
        {/* Show contact us and help for md and larger */}
        <div className="hidden md:flex items-center space-x-5">
          <IoMdHelpCircle className='h-7 w-7 text-primary hover:opacity-70' /> 
          <a href="#" className='text-primary text-base font-semibold hover:opacity-70'>Contact Us</a>
          <a href="#" className='text-primary text-base font-semibold hover:opacity-70'>Help</a>
        </div>

        {/* Theme toggle button */}
        <ThemeToggle className='bg-primary-foreground' />

        {/* User dropdown */}
        <UserProfileDropDown 
          profileImage={profileImage}
          userEmail={userEmail}
          profileFallBack={profileFallBack}
        />
        
      </div>
    </div>
  );
}

export default CullingDashboardHeader;
