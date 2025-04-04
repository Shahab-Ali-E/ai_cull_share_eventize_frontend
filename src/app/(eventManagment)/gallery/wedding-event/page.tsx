import ImagesGallery from "@/components/event-arrangment/gallery/wedding-event/ImagesGallery";
import { Label } from "@/components/ui/label";
import {
  mirrorWeddingGalleryData,
  rainForestWeddingGalleryData,
  birdWeddingGalleryData,
  winterWeddingGalleryData,
} from "@/utils/EventArrangmentData";
import React from "react";
import {Metadata} from "next"

export const metadata:Metadata = {
    title: "Event Arrangement | Gallery | Wedding Events",
    description:
      "Explore our breathtaking wedding gallery showcasing four stunning themes: Rainforest, Mirror, Bird, and Winter. Capture the essence of your dream wedding with beautifully curated images.",
    keywords: [
      "wedding gallery",
      "wedding themes",
      "Rainforest wedding",
      "Mirror theme wedding",
      "Bird theme wedding",
      "Winter wedding theme",
      "wedding photography",
      "wedding memories",
      "dream wedding",
      "luxury wedding decor",
    ],
  };
  

function page() {
  const dataForGallery = [
    { label: "RAINFOREST THEME", data: rainForestWeddingGalleryData },
    { label: "MIRROR THEME", data: mirrorWeddingGalleryData },
    { label: "BIRD THEME", data: birdWeddingGalleryData },
    { label: "WINTER THEME", data: winterWeddingGalleryData },
  ];

  return (
    <section className="flex flex-col min-h-screen relative w-full">
      {/* other content */}
      <div className="flex flex-col space-y-10 sm:space-y-20">
        <div className="flex flex-col justify-center items-center">
          {/* heading */}
          <div className={"flex flex-col items-center text-center font-inter"}>
            <h1 className="text-[#66a0fe] dark:text-[#81b1ff] text-3xl md:text-4xl font-semibold ">
              Wedding Gallery
            </h1>
            <p
              className={
                "mt-2 text-lg max-w-3xl font-inter font-medium text-muted-foreground"
              }
            >
              We handle every detail of your dream wedding with four stunning
              theme options for a perfect celebration.
            </p>
          </div>
        </div>

        {/* themes */}
        <div className="flex flex-col space-y-10 sm:space-y-20">
          {dataForGallery.map((data, index) => (
            <div key={index} className="flex flex-col space-y-5">
              <div className="flex flex-col justify-center items-center">
                <Label className="text-[#66a0fe] dark:text-[#81b1ff] text-2xl font-semibold font-inter">
                  {data.label}
                </Label>
              </div>

              {/* Images */}
              <div>
                <ImagesGallery images={data.data} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default page;
