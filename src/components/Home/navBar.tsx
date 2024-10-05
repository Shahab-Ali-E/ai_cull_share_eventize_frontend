"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/images/logo.png";
import Link from "next/link";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { ThemeToggle } from "../theme-toggle";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const [activeLink, setActiveLink] = useState<string>("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const stickNavBar = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickNavBar);
    return () => {
      window.removeEventListener("scroll", stickNavBar);
    };
  }, [stickNavBar]);

  const handleClick = (link: string) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <nav
      ref={navBarRef}
      style={{
        transition: "top 0.3s ease-in-out, padding 0.2s ease-in-out, width 0.3s ease-in-out",
      }}
      className={`flex flex-row justify-between top-0 w-full z-50 text-[#D6AECB] dark:text-white ${
        isSticky
          ? "fixed top-4 left-0 w-full rounded-full shadow-md shadow-[#D6AECB] dark:shadow-white backdrop-blur-md p-3"
          : "absolute bg-transparent p-6"
      }`}
    >
      {/* Logo */}
      <div className="flex">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          className="xl:h-16 xl:w-28 lg:h-14 lg:w-24 md:h-14 md:w-28 h-14 w-20"
        />
      </div>

      {/* Center: Navigation links for large screens */}
      <ul className="hidden md:flex flex-row w-full justify-center items-center xl:space-x-14 lg:space-x-15 md:space-x-10 font-semibold xl:text-base lg:text-sm md:text-sm">
        {["HOME", "SERVICES", "MENU", "SMART CULL", "SMART SHARE"].map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="dark:border-primary hover:px-6 py-4 hover:border-2 transition-all duration-150 ease-in-out rounded-full"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Right side: Login and Register buttons for large screens */}
      <div className="hidden md:flex justify-end items-center xl:space-x-4 lg:space-x-2 md:space-x-2">
        <ThemeToggle className="bg-primary-foreground"/>
        <button className="border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition transform hover:translate-y-[-5px] hover:translate-z-[20px] duration-300 py-3 px-5 xl:text-base font-semibold lg:text-sm md:text-sm">
          LOGIN
        </button>
        <button className="border-2 border-white text-black bg-white rounded-full hover:bg-black hover:text-white transition hover:translate-y-[-5px] hover:translate-z-[20px] duration-300 xl:text-base py-3 px-5 font-semibold lg:text-sm md:text-sm">
          REGISTER
        </button>
      </div>

      {/* ------------------Mobile Navigation------------------- */}

      {/* Hamburger Icon for small devices */}
      <div className="md:invisible flex self-center absolute right-10">
        <div className="mr-5">
          <ThemeToggle className="bg-primary-foreground"/>
        </div>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <IoClose 
              size={40}
            />
          ) : (
            <IoReorderThree 
              size={40}
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <ul
        className={`${
          isOpen ? "opacity-100 shadow-lg shadow-white rounded-2xl" : "opacity-0 pointer-events-none"
        } md:invisible flex flex-col absolute top-24 left-0 w-full text-center text-base font-normal text-primary transition-all duration-150 ease-in-out`}
      >
        {["HOME", "SERVICES", "MENU", "SMART CULL", "SMART SHARE"].map((link:string) => (
          <li className="text-center" key={link}>
            <Link
              href="#"
              onClick={() => handleClick(link)}
              className={`block p-4 border-border rounded-full ${
                activeLink === link ? "bg-black text-white" : ""
              }`}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
