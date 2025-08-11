"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function TestCasesPanel() {
  const [activeTab, setActiveTab] = useState("testcase");
  const [activeCase, setActiveCase] = useState(1);

  const testCases = [
    { id: 1, nums: "[2,7,11,15]", target: "9" },
    { id: 2, nums: "[3,2,4]", target: "6" },
    { id: 3, nums: "[3,3]", target: "6" },
  ];

  return (
    <div className="h-full bg-[#1a1a1a] flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#3d3d3d] bg-[#2d2d2d]">
        <button
          onClick={() => setActiveTab("testcase")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "testcase"
              ? "border-green-500 text-white bg-[#1a1a1a]"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          ✅ Testcase
        </button>
        <button
          onClick={() => setActiveTab("result")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "result"
              ? "border-green-500 text-white bg-[#1a1a1a]"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          Test Result
        </button>
      </div>

      {/* Test Case Selector */}
      <div className="flex items-center gap-2 p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
        {testCases.map((testCase) => (
          <Button
            key={testCase.id}
            variant={activeCase === testCase.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveCase(testCase.id)}
            className={
              activeCase === testCase.id
                ? "bg-[#3d3d3d] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#3d3d3d]"
            }
          >
            Case {testCase.id}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-[#3d3d3d]"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Test Case Content */}
      <div className="flex-1 p-4 space-y-4">
        {testCases
          .filter((tc) => tc.id === activeCase)
          .map((testCase) => (
            <div key={testCase.id} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  nums =
                </label>
                <Input
                  value={testCase.nums}
                  readOnly
                  className="bg-[#2d2d2d] border-[#3d3d3d] text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  target =
                </label>
                <Input
                  value={testCase.target}
                  readOnly
                  className="bg-[#2d2d2d] border-[#3d3d3d] text-white font-mono"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#3d3d3d] bg-[#2d2d2d]">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Source</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            ℹ️
          </Button>
        </div>
      </div>
    </div>
  );
}
