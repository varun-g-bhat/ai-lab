"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Play,
  Settings,
  User,
  Flame,
} from "lucide-react";

export function TopNavigation() {
  return (
    <div className="h-12 bg-[#2d2d2d] border-b border-[#3d3d3d] flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d] flex items-center gap-2"
        >
          <List className="w-4 h-4" />
          Problem List
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
        >
          <Play className="w-4 h-4" />
        </Button>

        <Button className="bg-green-600 hover:bg-green-700 text-white px-4">
          Submit
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
        >
          <Settings className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1 text-orange-400">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-medium">436</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
        >
          <User className="w-4 h-4" />
        </Button>

        <span className="text-orange-400 text-sm font-medium">Premium</span>
      </div>
    </div>
  );
}
