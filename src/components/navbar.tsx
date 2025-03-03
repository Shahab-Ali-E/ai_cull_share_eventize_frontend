"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect } from "react";
import logo from "@/images/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserProfile from "@/components/user-profile";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import SlideInFromTop from "./LandingPages/SlideInFromTop";


export default function Navbar() {
  const pathname = usePathname();
  const { getToken } = useAuth();

  useEffect(() => {
    const logToken = async () => {
      const token = await getToken();
      if (token) {
        console.log("Bearer Token:", token);
      }
    };

    logToken();
  }, [getToken]);

  // Define the navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Event Arrangement", href: "/event-arrangment" },
    { name: "Smart Culling", href: "/culling-home" },
    { name: "Smart Share", href: "/smart-share" },
    { name: "About", href: "/contact-us" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="Logo"
          width={30}
          height={30}
          className="h-14 w-14"
        />
      </div>

      {/* Navigation Links (Desktop) */}
      <SlideInFromTop duration={0.2} delay={0.3}>
        <div className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-purple-400/10 outline outline-1 outline-purple-300/20">
          {navLinks.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-inter text-primary text-sm font-medium hover:bg-purple-400/10 px-4 py-2 rounded-full",
                pathname === href ? "bg-purple-400/10" : ""
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </SlideInFromTop>

      {/* User Profile / Login */}
      <div className="flex gap-2">
        <UserProfile />
      </div>

      {/* Mobile Navigation Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-card text-primary">
          <div className="grid w-[200px] p-4 gap-5">
            {navLinks.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-lg font-medium hover:underline underline-offset-4 ${
                  pathname === href ? "underline" : ""
                }`}
                prefetch={false}
              >
                {name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
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
