'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface RevealXAxisProps {
  children: React.JSX.Element;
  className?: string;
  placeHolderColor?:string;
}

function RevealYAxis({ children, className, placeHolderColor="#00B8B8" }: RevealXAxisProps) {
    //hooks
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    const mainContent = useAnimation(); // for main content
    const slidePlaceHolder = useAnimation(); //for place holder

    //slide the place holder in
    useEffect(()=>{
        if(isInView){
            mainContent.start("visible");
            slidePlaceHolder.start("visible");
        }
    },[isInView])


  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
        <motion.div
        variants={{
            hidden:{opacity:0, y:75},
            visible:{opacity:1, y:0}
        }}
        initial="hidden"
        animate={mainContent}
        transition={{duration:0.5, delay:0.25}}
        >
            {children}
        </motion.div>

        {/* for showing place holder */}
        <motion.div 
            ref={ref}
            variants={{
                hidden:{left:0},
                visible:{left:"100%"}
            }}
            initial="hidden"
            animate={slidePlaceHolder}
            transition={{ duration: 0.5, ease: "easeIn" }} 
            style={{
                backgroundColor:placeHolderColor,
                position: "absolute",
                top: 4,
                bottom: 4,
                left: 0,
                right: 0,
                zIndex: 20,
            }}
        />
    </div>
  );
}

export default RevealYAxis;
