"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Code } from "lucide-react";

const submissions = [
  {
    id: 1,
    date: "2024-01-15 14:30:25",
    status: "Accepted",
    language: "JavaScript",
    runtime: "68ms",
    memory: "42.1MB",
    code: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`,
  },
  {
    id: 2,
    date: "2024-01-15 14:25:10",
    status: "Wrong Answer",
    language: "JavaScript",
    runtime: "N/A",
    memory: "N/A",
    code: `var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};`,
  },
  {
    id: 3,
    date: "2024-01-15 14:20:45",
    status: "Time Limit Exceeded",
    language: "Python",
    runtime: "N/A",
    memory: "N/A",
    code: `def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
  },
];

// export function SubmissionHistoryPanel() {
//   const [selectedSubmission, setSelectedSubmission] = useState<number | null>(
//     null
//   );

//   const handleLoadSubmission = (submission: (typeof submissions)[0]) => {
//     setSelectedSubmission(submission.id);
//     // In a real app, this would load the code into the editor
//     console.log("Loading submission:", submission.code);
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm flex items-center gap-2">
//           <Clock className="w-4 h-4" />
//           Submission History
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="flex-1 pt-0">
//         <ScrollArea className="h-full">
//           <div className="space-y-2">
//             {submissions.map((submission) => (
//               <Card
//                 key={submission.id}
//                 className={`cursor-pointer transition-colors hover:bg-muted/50 ${
//                   selectedSubmission === submission.id
//                     ? "ring-2 ring-primary"
//                     : ""
//                 }`}
//                 onClick={() => setSelectedSubmission(submission.id)}
//               >
//                 <CardContent className="p-3">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                       {submission.status === "Accepted" ? (
//                         <CheckCircle className="w-4 h-4 text-green-600" />
//                       ) : (
//                         <XCircle className="w-4 h-4 text-red-600" />
//                       )}
//                       <Badge
//                         variant={
//                           submission.status === "Accepted"
//                             ? "default"
//                             : "destructive"
//                         }
//                         className="text-xs"
//                       >
//                         {submission.status}
//                       </Badge>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleLoadSubmission(submission);
//                       }}
//                     >
//                       <Code className="w-3 h-3 mr-1" />
//                       Load
//                     </Button>
//                   </div>

//                   <div className="text-xs text-muted-foreground space-y-1">
//                     <div>{submission.date}</div>
//                     <div className="flex gap-4">
//                       <span>Language: {submission.language}</span>
//                       {submission.runtime !== "N/A" && (
//                         <span>Runtime: {submission.runtime}</span>
//                       )}
//                     </div>
//                     {submission.memory !== "N/A" && (
//                       <div>Memory: {submission.memory}</div>
//                     )}
//                   </div>

//                   {selectedSubmission === submission.id && (
//                     <div className="mt-3 pt-3 border-t">
//                       <div className="text-xs font-medium mb-2">
//                         Code Preview:
//                       </div>
//                       <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
//                         <code>{submission.code}</code>
//                       </pre>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </div>
//   );
// }

export function SubmissionHistoryPanel() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(
    null
  );

  const handleLoadSubmission = (submission: (typeof submissions)[0]) => {
    setSelectedSubmission(submission.id);
    console.log("Loading submission:", submission.code);
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Submission History
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {submissions.map((submission) => (
                <Card
                  key={submission.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedSubmission === submission.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedSubmission(submission.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {submission.status === "Accepted" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <Badge
                          variant={
                            submission.status === "Accepted"
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {submission.status}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadSubmission(submission);
                        }}
                      >
                        <Code className="w-3 h-3 mr-1" />
                        Load
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{submission.date}</div>
                      <div className="flex gap-4">
                        <span>Language: {submission.language}</span>
                        {submission.runtime !== "N/A" && (
                          <span>Runtime: {submission.runtime}</span>
                        )}
                      </div>
                      {submission.memory !== "N/A" && (
                        <div>Memory: {submission.memory}</div>
                      )}
                    </div>

                    {selectedSubmission === submission.id && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs font-medium mb-2">
                          Code Preview:
                        </div>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          <code>{submission.code}</code>
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
