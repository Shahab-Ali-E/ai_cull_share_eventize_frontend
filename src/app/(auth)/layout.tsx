import React from 'react'

function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col w-full min-h-screen bg-secondary '>
        {/* nav bar */}
        {/* <Navbar /> */}
        <div>{children}</div>
    </div>
  )
}

export default AuthLayout