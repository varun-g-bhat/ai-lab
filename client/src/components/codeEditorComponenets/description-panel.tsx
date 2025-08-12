"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share,
  CheckCircle,
} from "lucide-react";

export function DescriptionPanel() {
  return (
    <div className="h-full bg-[#1a1a1a] flex flex-col">
      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Problem Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">1. Two Sum</h1>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm">Solved</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-green-900 text-green-300 border-green-700">
                Easy
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <span className="mr-1">🏷️</span>
                Topics
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <span className="mr-1">🏢</span>
                Companies
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <span className="mr-1">💡</span>
                Hint
              </Button>
            </div>
          </div>

          {/* Problem Description */}
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="leading-relaxed">
                Given an array of integers{" "}
                <code className="bg-[#2d2d2d] px-2 py-1 rounded text-orange-300">
                  nums
                </code>{" "}
                and an integer{" "}
                <code className="bg-[#2d2d2d] px-2 py-1 rounded text-orange-300">
                  target
                </code>
                , return{" "}
                <em className="text-gray-400">
                  indices of the two numbers such that they add up to
                </em>{" "}
                <code className="bg-[#2d2d2d] px-2 py-1 rounded text-orange-300">
                  target
                </code>
                .
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                You may assume that each input would have{" "}
                <strong className="text-white">exactly one solution</strong>,
                and you may not use the{" "}
                <strong className="text-white">same</strong> element twice.
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                You can return the answer in any order.
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-3">Example 1:</h3>
                <div className="bg-[#2d2d2d] p-4 rounded-lg space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-white">Input:</span>{" "}
                    <span className="text-orange-300">
                      nums = [2,7,11,15], target = 9
                    </span>
                  </div>
                  <div>
                    <span className="text-white">Output:</span>{" "}
                    <span className="text-orange-300">[0,1]</span>
                  </div>
                  <div>
                    <span className="text-white">Explanation:</span>{" "}
                    <span className="text-gray-400">
                      Because nums[0] + nums[1] == 9, we return [0, 1].
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Example 2:</h3>
                <div className="bg-[#2d2d2d] p-4 rounded-lg space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-white">Input:</span>{" "}
                    <span className="text-orange-300">
                      nums = [3,2,4], target = 6
                    </span>
                  </div>
                  <div>
                    <span className="text-white">Output:</span>{" "}
                    <span className="text-orange-300">[1,2]</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Example 3:</h3>
                <div className="bg-[#2d2d2d] p-4 rounded-lg space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-white">Input:</span>{" "}
                    <span className="text-orange-300">
                      nums = [3,3], target = 6
                    </span>
                  </div>
                  <div>
                    <span className="text-white">Output:</span>{" "}
                    <span className="text-orange-300">[0,1]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#3d3d3d]">
            <div className="flex items-center gap-2 text-gray-400">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">63.3K</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">1.5K</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Bookmark className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Share className="w-4 h-4" />
            </div>
            <div className="ml-auto text-green-400 text-sm">• 2147 Online</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
