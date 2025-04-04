import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Label } from '@/components/ui/label';

interface ReviewCardData {
  icon: React.ReactNode; // icon (e.g., from react-icons)
  heading: string; // heading text
  content: string; // content text
}

interface ReviewCardProps {
  cardHeading:string;
  data: ReviewCardData[]; // Array of data for each item
}

function ReviewCard({ data, cardHeading }: ReviewCardProps) {
  return (
    <Card className="bg-secondary rounded-lg shadow-lg w-full">
      <CardHeader className="text-xl font-semibold">
        {cardHeading}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div
            key={index}
            className="flex items-start space-x-3 p-1"
          >
            <div className="text-muted-foreground">{item.icon}</div>
            <div className="flex flex-col space-y-1 min-w-0">
              <Label className="text-sm font-semibold text-muted-foreground">
                {item.heading}
              </Label>
              <Label className="text-sm text-primary break-words">
                {item.content}
              </Label>
            </div>
          </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
