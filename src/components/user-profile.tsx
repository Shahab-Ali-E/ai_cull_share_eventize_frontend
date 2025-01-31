// user-profile.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import Link from 'next/link';

function UserProfile() {
  const { isLoaded,isSignedIn } = useUser();

  if(!isSignedIn){
    return (
      <Button className='rounded-full' asChild>
        <Link href="/sign-in">
        Login
        </Link>
      </Button>
    )
  }

  return (
    <div>
      {isLoaded ? (
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                rootBox:
                  "bg-headingtext text-primary rounded-full p-[2.5px] transition-all",
                userButtonAvatarBox: "h-8 w-8",
                userButtonPopoverFooter: "hidden",

                userButtonPopoverCard: "border border-muted",
                userButtonPopoverMain: "bg-primary-foreground text-primary p-3",
                userPreviewSecondaryIdentifier: "text-muted-foreground",

                // popover styling
                userButtonPopoverActions:
                  "flex-col-reverse gap-2 space-y-2",
                userButtonPopoverActionButton:
                  "bg-muted text-primary hover:text-primary hover:bg-muted rounded-xl",
              },
            }}
            userProfileMode="navigation"
            userProfileUrl="/user-profile"
          >
            <UserButton.MenuItems></UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      ) : (
        <Skeleton className="h-10 w-10 rounded-full" />
      )}
    </div>
  );
}

export default UserProfile;
