"use client";

import React from "react";
import {
  IoIosMail,
  IoIosCall,
  IoIosPerson,
  IoIosCalendar,
} from "react-icons/io";
import { FaClipboardList, FaPeopleGroup } from "react-icons/fa6";
import ReviewCard from "@/components/event-arrangment/bookevent/ReviewCard";
import StepDescription from "@/components/event-arrangment/bookevent/StepDescription";
import useEventArrangementStore from "@/zustand/EventArrangementStore";
import { HandCoins } from "lucide-react";
import { FaGlobeAfrica, FaLocationArrow } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import BackButton from "@/components/event-arrangment/bookevent/BackButton";
import SubmitButton from "@/components/event-arrangment/bookevent/SubmitButton";
import { IoImage } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BookEvent } from "@/lib/actions/EventArrangment/BookEvent";
import { useAuth } from "@clerk/nextjs";
import { SubmitFormType } from "@/@types/event-managment";
import { toast } from "sonner";

function Review() {
  const [loading, setLoading] = React.useState(false); // Add loading state

  //get user id from clerk
  const { userId } = useAuth();

  // getting all steps data from zustand state
  const {
    personalInformation,
    eventInformation,
    destinationDetails,
    additionalInformation,
    resetForm,
  } = useEventArrangementStore();

  // router
  const router = useRouter();

  // form data to send backend
  const formData: SubmitFormType = {
    ...personalInformation,
    ...eventInformation,
    ...destinationDetails,
    ...additionalInformation,
    userId: userId,
  };

  // validate all steps are filled up or not
  const validateAllSteps = () => {
    if (
      !personalInformation.fullName ||
      !personalInformation.email ||
      !personalInformation.phone
    ) {
      return {
        step: "/book-event/step1",
        message: "please validate personal information",
      };
    }
    if (
      !eventInformation.eventType ||
      !eventInformation.eventDate ||
      !eventInformation.numberOfGuests ||
      !eventInformation.budget
    ) {
      return {
        step: "/book-event/step2",
        message: "please validate event information",
      };
    }
    if (!destinationDetails.selectCountry || !destinationDetails.city) {
      return {
        step: "/book-event/step3",
        message: "please validate destination information",
      };
    }
    return null;
  };

  // Create a new Date object
  const currentDate = new Date();

  // Format the date in the desired format
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(currentDate);

  //handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    try {
      const incompleteStep = validateAllSteps();
      if (incompleteStep) {
        toast.warning("Incomplete Form", {
          description: incompleteStep.message,
        });
        router.push(`${incompleteStep.step}`);
        return;
      } else {
        console.log("Form Data:", formData); // Log form data for debugging
        const response = await BookEvent({ formData: formData });

        if (response?.error) {
          toast.error("Error Submitting Form", {
            description: response.error,
          });
        } else if (response?.formId) {
          router.push("/event-arrangment-dashboard");
          resetForm();
          toast.success("Successfully submitted", {
            description: `Submitted at ${formattedDate}`,
          });
        }
      }
    } catch (err) {
      console.error("Validation error:", err);
      toast.error("Error Submitting Form", {
        description: "Please fix the errors and try again.",
      });
    }
    finally{
      setLoading(false);
    }
  };

  // Prepare data for each review card
  const personalInfo = [
    {
      icon: <IoIosPerson size={19} />,
      heading: "Full Name",
      content: personalInformation.fullName || "N/A",
    },
    {
      icon: <IoIosMail size={19} />,
      heading: "Email Address",
      content: personalInformation.email || "N/A",
    },
    {
      icon: <IoIosCall size={19} />,
      heading: "Phone Number",
      content: personalInformation.phone || "N/A",
    },
  ];

  const eventDetails = [
    {
      icon: <BsStars size={20} />,
      heading: "Event Type",
      content: eventInformation.eventType || "Not Selected",
    },
    {
      icon: <IoIosCalendar size={19} />,
      heading: "Event Date",
      content:
        eventInformation.eventDate?.toLocaleDateString() || "Not Specified",
    },
    {
      icon: <FaPeopleGroup size={19} />,
      heading: "Number of Guests",
      content: eventInformation.numberOfGuests.toString() || "0",
    },
    {
      icon: <HandCoins strokeWidth={1.75} />,
      heading: "Budget",
      content: `${eventInformation.budget} PKR` || "0 PKR",
    },
    ...(eventInformation.eventType === "other"
      ? [
          {
            icon: <FaClipboardList size={20} />,
            heading: "Event Description",
            content:
              eventInformation.eventDescription || "No Description Provided",
          },
        ]
      : []),
  ];

  const destinationDetailsData = [
    {
      icon: <FaGlobeAfrica size={17} />,
      heading: "Country",
      content: destinationDetails.selectCountry || "Not Selected",
    },
    {
      icon: <FaLocationArrow size={17} />,
      heading: "City",
      content: destinationDetails.city || "Not Selected",
    },
    {
      icon: <FaLocationArrow size={17} />,
      heading: "Alternative City",
      content: destinationDetails.alternativeCity || "Not Selected",
    },
  ];

  const additionalInfo = [
    {
      icon: <IoImage size={19} />,
      heading: "Portfolio",
      content: additionalInformation.portFolio || "Not Selected",
    },
    {
      icon: <FaClipboardList size={20} />,
      heading: "Special Requirements",
      content: additionalInformation.specialRequirements || "N/A",
    },
  ];

  return (
    <form
      className="flex flex-col w-full justify-between"
      onSubmit={handleSubmit}
    >
      <div className="w-full space-y-10">
        {/* Step Description */}
        <StepDescription
          heading="Review and Submit"
          description="Review the details before submission."
          className="mb-7"
        />

        {/* Review Cards */}
        <div className="flex flex-col space-y-8">
          <ReviewCard data={personalInfo} cardHeading="Personal Information" />
          <ReviewCard data={eventDetails} cardHeading="Event Detail" />
          <ReviewCard
            data={destinationDetailsData}
            cardHeading="Selected Destination"
          />
          <ReviewCard
            data={additionalInfo}
            cardHeading="Additional Information"
          />
        </div>

        {/* Submit and Back Buttons */}
        <div className="flex justify-between">
          <BackButton />
          <SubmitButton text="Submit" loading={loading}/>
        </div>
      </div>
    </form>
  );
}

export default Review;
