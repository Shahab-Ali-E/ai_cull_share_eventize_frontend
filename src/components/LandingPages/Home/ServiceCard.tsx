"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import  LearnMoreButton from "./LearnMoreButton";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  delay?: number;
}

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  link,
  delay = 0,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="overflow-hidden border border-border bg-primary-foreground backdrop-blur-sm ">
        <CardContent className="pt-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <LearnMoreButton href={link} label={`Learn more`} />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
