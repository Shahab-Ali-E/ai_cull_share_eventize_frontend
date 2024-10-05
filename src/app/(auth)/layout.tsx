import React from 'react'

function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col justify-center items-center bg-secondary'>
        <div>{children}</div>
    </div>
  )
}

export default AuthLayout