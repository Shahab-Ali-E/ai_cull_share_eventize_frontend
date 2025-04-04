import { BirthdayEventPriceType } from "@/@types/Types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import celebrationImage from "@/images/EventArrangment/celebration_bg.png";

export default function PricingSectionCards({
  data,
}: {
  data: BirthdayEventPriceType[];
}) {
  return (
    <>
      {/* Pricing */}
      <div className="container space-y-8 sm:space-y-20">
        {/* Title */}
        <div className="flex justify-center">
          <h1 className="text-[#66a0fe] dark:text-[#81b1ff] text-3xl md:text-4xl font-semibold">
            PRICES
          </h1>
        </div>

        {/* Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center px-10 sm:px-0">
          {/* Card */}
          {data.map((items, index) => (
            <Card
              key={index}
              className={`h-full relative overflow-hidden ${
                index === 1
                  ? "border-2 border-primary scale-100 sm:scale-105 shadow-none sm:shadow-xl shadow-primary"
                  : ""
              }`}
            >
              {/* Background Image */}
              <Image
                src={celebrationImage}
                alt="hurrah"
                unoptimized
                className="absolute"
              />
              <CardHeader className="text-center pt-16">
                {index === 1 ? (
                  <Badge className="uppercase w-max self-center mb-3">
                    Most popular
                  </Badge>
                ) : null}
                <CardTitle className="font-bold text-4xl">
                  {items.heading}
                </CardTitle>
                <span className="text-muted-foreground">
                  {items.description}
                </span>
              </CardHeader>
              <CardContent>
                {items.bullets.map((list, index) => (
                  <ul key={index} className="mt-7 space-y-2.5 text-sm">
                    <li className="flex space-x-2">
                      <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                      <span className="text-muted-foreground">{list}</span>
                    </li>
                  </ul>
                ))}
              </CardContent>
              <CardFooter className="text-primary text-lg font-medium">
                {items.price}
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* End Grid */}
        {/* Comparison table */}

        {/* End Comparison table */}
      </div>
      {/* End Pricing */}
    </>
  );
}
