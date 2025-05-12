"use client";

import React from 'react';
import Link from 'next/link';
import { IoSparkles } from "react-icons/io5";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Input } from './ui/input';

function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Event Arrangement", href: "/event-arrangment" },
    { name: "Smart Culling", href: "/culling-home" },
    { name: "Smart Share", href: "/smart-share" },
    { name: "About", href: "/about-us" },
  ];

  const socialLinks = [
    { icon: <FaTwitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedinIn className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaGithub className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="w-full bg-card border-t border-muted-foreground/15 backdrop-blur-lg">
      {/* Top section with gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-teal-400 to-purple-600"></div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IoSparkles className="h-8 w-8 text-primary" fill={isDarkMode ? "#ffffff" : "#000000"} />
              <span className="text-xl font-bold font-inter text-primary">AICSE</span>
            </div>
            <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              AI Cull, Share, and Eventize is an intelligent media management platform that automates culling, 
              organizes shared content, and enhances event-based media workflows with AI-powered insights.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-muted/20 border-muted-foreground/20 text-primary"
              />
              <Button 
                className="bg-gradient-to-r from-purple-600 to-teal-400 text-white hover:opacity-90"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Have questions or feedback?
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Email: <a href="mailto:info@snapcullai.com" className="text-primary hover:underline">info@snapcullai.com</a>
            </p>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-primary">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-6 border-t border-muted-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Ai Cull Share Eventize. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;