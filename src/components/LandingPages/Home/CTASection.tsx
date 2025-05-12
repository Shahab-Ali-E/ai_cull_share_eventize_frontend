"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 ">
        <motion.div 
          className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-xl relative z-10 bg-primary-foreground backdrop-blur-md border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Digital Experience?
          </motion.h2>
          <motion.p 
            className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of users who have streamlined their event planning and photo management with our innovative platform.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/event-arrangment">Start Event Planning</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full bg-secondary">
              <Link href="/culling-home">Try Smart Culling</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;