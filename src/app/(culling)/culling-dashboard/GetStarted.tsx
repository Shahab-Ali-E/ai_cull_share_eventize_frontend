'use client'

import CreateCullingWorkSpace from '@/components/Culling/CreateWorkSpace'
import { LottieComponent } from '@/components/lazy-lottie-load'
import { Label } from '@radix-ui/react-dropdown-menu'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'


function GetStarted(){
    
    const client = new QueryClient();
  return (
      <QueryClientProvider client={client}>
        <div className="flex flex-col items-center space-y-10">
            <LottieComponent
                getAnimationData={() =>
                import('../../../images/animated-icons/Rocket-launch.json')
                }
                id="empty-box"
                loop
                className="h-56 w-56"
            />
            <div className="flex flex-col text-center space-y-4">
                <Label className="text-4xl font-bold text-primary">Get Started!</Label>
                <Label className="text-base font-semibold text-primary">
                <span>✨ Elevate your images effortlessly!<br /></span>
                <span>
                    Simply create a culling workspace, upload your images, and let our AI take care of
                    the rest. 💡
                </span>
                </Label>
            </div>
            <div className="mt-10">
                <CreateCullingWorkSpace/>
            </div>
        </div>
        </QueryClientProvider>
  )
}

export default GetStarted