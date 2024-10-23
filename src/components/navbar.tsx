import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import logo from "@/images/logo.png";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { cookies } from "next/headers";
import UserProfileDropDown from "./user-profile";

export default function Navbar() {
    
    // getting user details from cookies if the user was authenticated
    const name: string | undefined = cookies().get('name')?.value;
    const email: string | undefined = cookies().get('email')?.value;
    const pictureURL: string | undefined = cookies().get("picture")?.value;

    // Cleaning the user data
    const cleanedName: string = name?.replace(/^"|"$/g, '') ?? '';
    const cleanedEmail: string = email?.replace(/^"|"$/g, '') ?? '';
    const profileImageUrl: string = pictureURL?.replace(/^"|"$/g, '') ?? '';
    const fallBack: string = cleanedName.split(" ").map(name => name[0]).join('').toUpperCase();

    return (
        <div className="sticky top-4 z-50 flex items-center justify-between px-7 py-2 shadow-sm shadow-card backdrop-blur-lg bg-white/10 rounded-full">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
                <Image
                    src={logo}
                    alt="Logo"
                    className="xl:h-11 xl:w-16 lg:h-10 lg:w-16 md:h-10 md:w-16 h-9 w-14"
                />
            </Link>
            <div className="hidden md:flex gap-4">
                <Link href="/" className="text-base font-medium px-5 py-2 hover:bg-primary-foreground hover:rounded-full transition-all duration-150 ease-in-out" prefetch={false}>
                    Home
                </Link>
                <Link href="/services" className="text-base font-medium px-5 py-2 hover:bg-primary-foreground hover:rounded-full transition-all duration-150 ease-in-out" prefetch={false}>
                    Event Arrangement
                </Link>
                <Link href="/culling-home" className="text-base font-medium px-5 py-2 hover:bg-primary-foreground hover:rounded-full transition-all duration-150 ease-in-out" prefetch={false}>
                    Culling
                </Link>
                <Link href="#" className="text-base font-medium px-5 py-2 hover:bg-primary-foreground hover:rounded-full transition-all duration-150 ease-in-out" prefetch={false}>
                    Smart Share
                </Link>
                <Link href="#" className="text-base font-medium px-5 py-2 hover:bg-primary-foreground hover:rounded-full transition-all duration-150 ease-in-out" prefetch={false}>
                    Contact
                </Link>
            </div>
            <div className="flex items-center invisible sm:visible gap-4">
                <div className="hidden sm:block">
                    <ThemeToggle />
                </div>
                {/* Check if the user was authenticated then show its badge/profile otherwise show the signup button */}
                {name && email ? (             
                    // User profile
                    <UserProfileDropDown 
                        profileImage={profileImageUrl}
                        userEmail={cleanedEmail}
                        profileFallBack={fallBack}
                    />
                ) : (
                    // Sign up button
                    <Button variant="default" className="rounded-full px-6 hover:scale-105 transition-all ease-in-out duration-200">SignUp</Button>
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
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            Services
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            Portfolio
                        </Link>
                        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
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
