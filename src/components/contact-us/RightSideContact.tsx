"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

function RightSideContact() {
  const phoneNumber = "+1 (555) 000-0000";

  const whatsAppNumber = "+923445179790";
  const baseUrl = "https://api.whatsapp.com/send/";
  const encodedMessage =
    "Hello, let's chat on your whatsapp to solve your problem !";
  const whatsAppLink = `${baseUrl}?phone=${whatsAppNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      toast.success("Phone number copied to clipboard!");
    } catch {
      toast.error("Failed to copy phone number. Try again!");
    }
  };

  return (
    <Card className="bg-card dark:bg-primary-foreground">
      <CardContent className="space-y-7 p-10 ">
        {/* Chat with us */}
        <div>
          <h3 className="text-base font-semibold">Chat with us</h3>
          <p className="text-muted-foreground text-sm">
            Speak to our friendly team via live chat.
          </p>
          <div className="space-y-1 mt-2">
            {/* Start Chat on WhatsApp */}
            <Button variant="link" className="flex items-center" asChild>
              <Link
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  className="h-6 w-6"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  ></path>
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Start chat with us</span>
              </Link>
            </Button>

            {/* Email */}
            <Button variant="link" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Shoot us an email</span>
            </Button>

            {/* Message on X (Twitter) */}
            <Button variant="link" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              <span>Message us on X</span>
            </Button>
          </div>
        </div>

        {/* Call us */}
        <div>
          <h3 className="text-base font-semibold">Call us</h3>
          <p className="text-muted-foreground text-sm">
            Call our team Mon-Fri from 8am to 5pm.
          </p>
          <Button
            variant="link"
            className="flex items-center gap-2 font-bold"
            onClick={copyPhoneNumber}
          >
            <Phone size={16} /> {phoneNumber}
          </Button>
        </div>

        {/* Visit us */}
        <div>
          <h3 className="text-base font-semibold">Visit us</h3>
          <p className="text-muted-foreground text-sm">
            Chat to us in person at our Melbourne HQ.
          </p>
          <Button variant="link" className="flex items-center gap-2">
            <MapPin size={16} /> 100 Smith Street, Collingwood VIC 3066
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default RightSideContact;
