"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SidebarThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className={`flex items-center justify-between ${className} p-2`}>
      {/* Moon Icon */}
      {isDark ? <Moon size={20} className="font-bold" /> : <Sun size={20} />}
      {/* Label Text */}
      <Label className="text-sm font-medium text-primary">
        {isDark ? "Dark" : "Light"}
      </Label>
      {/* Toggle Button */}
      <Switch checked={isDark} onCheckedChange={handleToggle} />
    </div>
  );
}
