"use client";

import React from "react";
import { IoIosMail, IoIosCall, IoIosPerson, IoIosCalendar, IoIosPin, IoIosPeople } from "react-icons/io";
import { FaClipboardList, FaPeopleGroup } from "react-icons/fa6";
import ReviewCard from "@/components/event-arrangment/bookevent/ReviewCard";
import StepDescription from "@/components/event-arrangment/bookevent/StepDescription";
import useEventFormStore from "@/zustand/EventFormStore";
import { ClipboardPenLine, HandCoins, Sparkle } from "lucide-react";
import { FaGlobeAfrica, FaLocationArrow } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import BackButton from "@/components/event-arrangment/bookevent/BackButton";
import SubmitButton from "@/components/event-arrangment/bookevent/SubmitButton";


function Review() {
  const {
    personalInformation,
    eventInformation,
    destinationDetails,
    additionalInformation,
  } = useEventFormStore();

  // Prepare data for each review card
  const personalInfo = [
    { icon: <IoIosPerson size={19}  />, heading: "Full Name", content: personalInformation.fullName || "N/A"},
    { icon: <IoIosMail size={19}  />, heading: "Email Address", content: personalInformation.email || "N/A"},
    { icon: <IoIosCall size={19}  />, heading: "Phone Number", content: personalInformation.phone || "N/A"},
  ];

  const eventDetails = [
    { icon: <BsStars size={20}/>, heading: "Event Type", content: eventInformation.eventType || "Not Selected"},
    { icon: <IoIosCalendar size={19} />, heading: "Event Date", content: eventInformation.eventDate?.toLocaleDateString() || "Not Specified" },
    { icon: <FaPeopleGroup size={19} />, heading: "Number of Guests", content: eventInformation.numberOfGuests.toString() || "0" },
    { icon: <HandCoins strokeWidth={1.75} />, heading: "Budget", content: `${eventInformation.budget} PKR` || "0 PKR" },
    ...(eventInformation.eventType === "other"
      ? [{ icon: <FaClipboardList size={20}/>, heading: "Event Description", content: eventInformation.eventDescription || "No Description Provided" }]
      : []),
  ];

  const destinationDetailsData = [
    { icon: <FaGlobeAfrica size={17}/>, heading: "Country", content: destinationDetails.selectCountry || "Not Selected" },
    { icon: <FaLocationArrow size={17} />, heading: "City", content: destinationDetails.city || "Not Selected" },
    { icon: <FaLocationArrow size={17} />, heading: "Alternative City", content: destinationDetails.alternativeCity || "Not Selected" },
  ];

  const additionalInfo = [
    { icon: <IoIosPerson size={19}/>, heading: "Portfolio", content: additionalInformation.portFolio || "Not Selected" },
    { icon: <IoIosPerson size={19} />, heading: "Special Requirements", content: additionalInformation.specialRequirements || "N/A" },
  ];
  
  return (
    <div className="w-full space-y-10">
      {/* Step Description */}
      <StepDescription
        heading="Review and Submit"
        description="Review the details before submission."
        className="mb-7"
      />

      {/* Review Cards */}
      <div className="flex flex-col space-y-8">
        <ReviewCard data={personalInfo} />
        <ReviewCard data={eventDetails} />
        <ReviewCard data={destinationDetailsData} />
        <ReviewCard data={additionalInfo} />
      </div>

      {/* Submit and Back Buttons */}
      <div className="flex justify-between">
        <BackButton />
        <SubmitButton text="Submit" />
      </div>
    </div>
  );
}

export default Review;
