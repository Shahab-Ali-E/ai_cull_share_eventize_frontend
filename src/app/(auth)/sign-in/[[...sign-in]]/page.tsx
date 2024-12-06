import { SignIn } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <section className='flex min-h-screen justify-center items-center'>
        <SignIn 
          appearance={{
            elements:{
              card:"bg-card rounded-none border-b border-muted-foreground",
              headerTitle:"text-primary",
              headerSubtitle:"text-muted-foreground",
              socialButtonsIconButton:"bg-muted hover:bg-primary-foreground",
              dividerText:"text-muted-foreground",
              dividerLine:"bg-muted-foreground",
              formFieldInputShowPasswordButton:"text-primary hover:text-secondary-foreground",
              footerActionLink:"text-muted-foreground hover:text-accent-foreground",
              backLink:"text-muted-foreground",
              otpCodeFieldInput:"bg-secondary text-primary",
              formResendCodeLink:"text-muted-foreground",
              alternativeMethodsBlockButton:"bg-secondary text-primary hover:bg-secondary",
              formFieldAction__password:"text-muted-foreground hover:text-muted-foreground",
            }
          }}
        />
    </section>
  )
}

export default page