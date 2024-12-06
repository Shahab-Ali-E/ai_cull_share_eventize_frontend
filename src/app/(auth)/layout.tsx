import Navbar from '@/components/navbar'
import React from 'react'

function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col bg-primary-foreground px-10'>
        {/* nav bar */}
        <Navbar />
        <div>{children}</div>
    </div>
  )
}

export default AuthLayout