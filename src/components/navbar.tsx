"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect } from "react";
import logo from "@/images/logo.png";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation"; // Import from next/navigation
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

interface NavbarProps {
  fixed?: boolean;
}

export default function Navbar({ fixed = false }: NavbarProps) {
  const pathname = usePathname();
  const { getToken } = useAuth();
  const { isLoaded } = useUser();
  
  // Function to fetch and log the token
  useEffect(() => {
    const logToken = async () => {
      const token = await getToken(); // Fetch the Bearer token
      if (token) {
        console.log("Bearer Token:", token); // Log the token in the console
      }
    };

    logToken();
  }, [getToken]);

  // Check if the link is active
  const isActive = (route: string) => pathname === route;

  return (
    <div
      className={`${
        fixed ? "sticky  w-full" : "mt-7"
      } z-50 flex items-center justify-between px-7 py-2 text-primary shadow-md shadow-gray-300 dark:shadow-primary-foreground bg-[#e9e8e8] dark:bg-card rounded-full`}
    >
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image
          src={logo}
          alt="Logo"
          className="xl:h-11 xl:w-16 lg:h-10 lg:w-16 md:h-10 md:w-16 h-9 w-14"
        />
      </Link>
      <div className="hidden md:flex gap-4">
        <Link
          href="/"
          className={`text-base font-medium px-5 py-2 hover:bg-muted hover:rounded-full transition-all duration-150 ease-in-out ${
            isActive("/") ? "bg-muted rounded-full" : ""
          }`}
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/event-arrangment"
          className={`text-base font-medium px-5 py-2 hover:bg-muted hover:rounded-full transition-all duration-150 ease-in-out ${
            isActive("/event-arrangment") ? "bg-muted rounded-full" : ""
          }`}
          prefetch={false}
        >
          Event Arrangement
        </Link>
        <Link
          href="/culling-home"
          className={`text-base font-medium px-5 py-2 hover:bg-muted hover:rounded-full transition-all duration-150 ease-in-out ${
            isActive("/culling-home") ? "bg-muted rounded-full" : ""
          }`}
          prefetch={false}
        >
          Culling
        </Link>
        <Link
          href="/smart-share"
          className={`text-base font-medium px-5 py-2 hover:bg-muted hover:rounded-full transition-all duration-150 ease-in-out ${
            isActive("/smart-share") ? "bg-muted rounded-full" : ""
          }`}
          prefetch={false}
        >
          Smart Share
        </Link>
        <Link
          href="/contact"
          className={`text-base font-medium px-5 py-2 hover:bg-muted hover:rounded-full transition-all duration-150 ease-in-out ${
            isActive("/contact") ? "bg-muted rounded-full" : ""
          }`}
          prefetch={false}
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        {/* Check if the user was authenticated, then show their profile, otherwise show the SignUp button */}
        {/* if user not sign in then show sigin button */}
        {isLoaded ? (
          <div>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="default"
                  className="rounded-full px-6 hover:scale-105 transition-all ease-in-out duration-200 "
                >
                  SignIn
                </Button>
              </SignInButton>
            </SignedOut>

            {/* if sign in then show user profile */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    rootBox:
                      "bg-headingtext hover:scale-105 text-primary rounded-full p-1 transition-all",
                    userButtonAvatarBox: "h-9 w-9",
                    userButtonPopoverFooter: "hidden",

                    userButtonPopoverCard: "border border-muted",
                    userButtonPopoverMain: "bg-card text-primary p-3",
                    userPreviewSecondaryIdentifier: "text-muted-foreground",

                    // popover styling
                    userButtonPopoverActions:
                      "flex-col-reverse gap-2 space-y-2",
                    userButtonPopoverActionButton:
                      "bg-primary-foreground text-primary hover:text-primary hover:bg-muted rounded-xl",
                  },
                }}
                userProfileMode="navigation"
                userProfileUrl="/user-profile"
              >
                <UserButton.MenuItems></UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-card text-primary">
          <div className="grid w-[200px] p-4 gap-5">
            <Link
              href="/"
              className={`text-lg font-medium hover:underline underline-offset-4 ${
                isActive("/") ? "underline" : ""
              }`}
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/event-arrangment"
              className={`text-lg font-medium hover:underline underline-offset-4 ${
                isActive("/event-arrangment") ? "underline" : ""
              }`}
              prefetch={false}
            >
              Event Arrangment
            </Link>
            <Link
              href="/culling-home"
              className={`text-lg font-medium hover:underline underline-offset-4 ${
                isActive("/culling-home") ? "underline" : ""
              }`}
              prefetch={false}
            >
              Culling
            </Link>
            <Link
              href="/smart-share"
              className={`text-lg font-medium hover:underline underline-offset-4 ${
                isActive("/smart-share") ? "underline" : ""
              }`}
              prefetch={false}
            >
              Smart Share
            </Link>
            <Link
              href="/contact"
              className={`text-lg font-medium hover:underline underline-offset-4 ${
                isActive("/contact") ? "underline" : ""
              }`}
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
