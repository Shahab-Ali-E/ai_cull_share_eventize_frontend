"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserProfile from "@/components/user-profile";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import SlideInFromTop from "./LandingPages/SlideInFromTop";
import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const pathname = usePathname();
  const { getToken } = useAuth();

  useEffect(() => {
    const logToken = async () => {
      const token = await getToken({template:"AI_Cull_Share_Eventize"});
      if (token) console.log("Bearer Token:", token);
    };
    logToken();
  }, [getToken]);

  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Event Arrangement", href: "/event-arrangment" },
    { name: "Smart Culling", href: "/culling-home" },
    { name: "Smart Share", href: "/smart-share" },
    { name: "About", href: "/about-us" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-muted/20 dark:bg-black/10 border-b-[3px] border-muted-foreground/15">
      <SlideInFromTop duration={0.2} delay={0.3}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6">
            {navLinks.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-muted-foreground text-sm font-medium hover:text-primary transition",
                  pathname === href ? "text-primary font-semibold" : ""
                )}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* User Profile (Desktop) */}
          <div className="hidden md:flex gap-4 items-center">
            <ThemeToggle />
            <UserProfile />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet>
              <div className="flex gap-2 bg-primary p-1.5 rounded-sm md:hidden">
                <ThemeToggle />
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-primary"
                  >
                    <MenuIcon className="h-6 w-6 text-primary-foreground hover:text-primary-foreground" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent side="left" className="bg-black text-white">
                <div className="grid p-4 gap-5">
                  {navLinks.map(({ name, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-lg font-medium hover:underline"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </SlideInFromTop>
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
