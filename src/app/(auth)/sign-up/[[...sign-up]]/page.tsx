import { SignUp } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <section className='flex min-h-screen justify-center items-center'>
        <SignUp 
          appearance={{
            elements:{
              card:"bg-card rounded-none border-b border-muted-foreground",
              headerTitle:"text-primary",
              headerSubtitle:"text-muted-foreground",
              socialButtonsIconButton:"bg-muted hover:bg-primary-foreground",
              dividerText:"text-muted-foreground",
              dividerLine:"bg-muted-foreground",
              formFieldInputShowPasswordButton:"text-primary hover:text-secondary-foreground",
              otpCodeFieldInput:"bg-secondary text-primary",
              formResendCodeLink:"text-muted-foreground",
              identityPreviewEditButton:"text-muted-foreground",
              footerActionLink:"text-muted-foreground hover:text-accent-foreground"
            }
          }}
        />
    </section>
  )
}

export default page