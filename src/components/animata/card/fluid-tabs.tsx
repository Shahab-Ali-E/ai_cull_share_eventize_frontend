"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FluidTabsProp {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FluidTabsComponentProps {
  tabs: FluidTabsProp[];
  onTabChange: (tabId: string) => void; // Add a callback to notify the parent
}

export default function FluidTabs({
  tabs,
  onTabChange, // Get the callback from parent
}: FluidTabsComponentProps) {
  const [activeTab, setActiveTab] = useState("menu1");
  const [touchedTab, setTouchedTab] = useState<string | null>(null);
  const [prevActiveTab, setPrevActiveTab] = useState("menu1");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setPrevActiveTab(activeTab);
    setActiveTab(tabId);
    setTouchedTab(tabId);
    onTabChange(tabId); // Notify parent of the tab change

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
    }, 300);
  };

  const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

  return (
    <div className="flex items-center justify-center p-0 sm:p-4 border-2 border-redishtext w-full rounded-full">
      <div className="relative flex w-full space-x-2 overflow-hidden rounded-full bg-redishtext p-1 shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-0 rounded-full bg-white"
            initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`relative z-10 flex w-full items-center justify-center gap-1.5  px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-bold transition-colors duration-300 ${
              activeTab === tab.id ? "font-bold text-black" : "text-white"
            } ${touchedTab === tab.id ? "blur-sm" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
