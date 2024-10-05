"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

//images
import logo from '@/images/logo.png';
import cardbg from '@/images/bg-image.png';

//icons
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";

//API URL
import { NEXT_PUBLIC_AUTH_LOGIN_URL } from '@/constants/ApiUrls';

const Login = () => {

  const handleGoogleLogin = async () => {
    window.location.href = NEXT_PUBLIC_AUTH_LOGIN_URL;
  };
  
  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='flex flex-row items-center justify-center space-x-4'>
        
        {/* Image Card */}
        <Card className='relative overflow-hidden xl:w-[650px] xl:h-[500px] lg:w-[550px] lg:h-[450px] md:w-[400px] md:h-[350px] dark:border-gray-500'>
          <Image
            src={cardbg}
            alt='bg-image'
            fill
            className='object-cover'
          />
        </Card>

        {/* Login Card */}
        <Card className='flex flex-col justify-center items-center xl:space-y-8 lg:space-y-8 md:space-y-0 xl:w-[500px] xl:h-[500px] lg:w-[450px] lg:h-[450px] md:h-[350px] md:w-[350px] p-8 dark:bg-primary-foreground dark:border-gray-500'>
          {/* Header */}
          <CardHeader className='text-center items-center'>
            <Image src={logo} alt='company-logo' height={70} width={70} />
            <h2 className='font-semibold mt-4 text-xl xl:text-xl lg:text-xl md:text-lg'>Text here</h2>
          </CardHeader>

          {/* Sign-in buttons */}
          <CardContent className='flex flex-col space-y-4 xl:space-y-5 lg:space-y-5 md:space-y-3'>
            <Button
              className='pl-10 pr-10 p-10 xl:p-7 xl:pl-20 xl:pr-20  border-2 gap-4 xl:text-lg lg:text-lg lg:pl-20 lg:pr-20 md:text-base md:p-5 md:pl-4 md:pr-4'
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={25} /> Continue with Google
            </Button>
            <Button className='pl-10 pr-10 p-10 xl:p-7 xl:pl-20 xl:pr-20  border-2 gap-4 xl:text-lg lg:text-lg lg:pl-20 lg:pr-20 md:text-base md:p-5 md:pl-4 md:pr-4'>
              <FaDiscord size={25} color='#5562EA'/>Continue with Discord
            </Button>
          </CardContent>

          {/* Bottom description */}
          <CardDescription className='text-sm text-center'>
            <span>
              By continuing, you acknowledge that you have read and agree to Ai Cull Share & Eventize <a href="" className='underline'>Terms & Conditions</a> and <a href="" className='underline'>Privacy policy</a>.
            </span>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default Login;
