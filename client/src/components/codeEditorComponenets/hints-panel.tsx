"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const hintsData = {
  hints: [
    "Consider using a more appropriate data structure for representing the graph, such as an adjacency list. This will improve efficiency.",
    "Your algorithm seems to be a variation of Kahn's algorithm. Carefully review the conditions for adding a node to the queue and decrementing in-degrees. Ensure you correctly handle the case where multiple nodes have an in-degree of zero.",
    "Debug your loop termination condition. Is `m` accurately reflecting the number of nodes processed? Trace the execution for a small example graph.",
    "The topological sort output is missing the last element. Review your print statement's loop bounds.",
  ],
};

// export function HintsPanel() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [expandedHints, setExpandedHints] = useState<number[]>([]);

//   const toggleHint = (index: number) => {
//     setExpandedHints((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   return (
//     <div className="h-full flex flex-col border-r">
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Lightbulb className="w-4 h-4 text-yellow-500" />
//             <CardTitle className="text-sm">Hints</CardTitle>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setIsVisible(!isVisible)}
//           >
//             {isVisible ? (
//               <ChevronUp className="w-4 h-4" />
//             ) : (
//               <ChevronDown className="w-4 h-4" />
//             )}
//           </Button>
//         </div>
//       </CardHeader>

//       {isVisible && (
//         <CardContent className="flex-1 pt-0">
//           <ScrollArea className="h-full">
//             <div className="space-y-2">
//               {hintsData.hints.map((hint, index) => (
//                 <Card
//                   key={index}
//                   className="border border-yellow-200 dark:border-yellow-800"
//                 >
//                   <CardContent className="p-3">
//                     <div className="flex items-start gap-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="p-0 h-auto"
//                         onClick={() => toggleHint(index)}
//                       >
//                         {expandedHints.includes(index) ? (
//                           <ChevronUp className="w-4 h-4" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4" />
//                         )}
//                       </Button>
//                       <div className="flex-1">
//                         <div className="text-sm font-medium mb-1">
//                           Hint {index + 1}
//                         </div>
//                         {expandedHints.includes(index) && (
//                           <div className="text-xs text-muted-foreground">
//                             {hint}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       )}
//     </div>
//   );
// }

export function HintsPanel() {
  const [isVisible, setIsVisible] = useState(true);
  const [expandedHints, setExpandedHints] = useState<number[]>([]);

  const toggleHint = (index: number) => {
    setExpandedHints((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="h-full flex flex-col border-r">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <CardTitle className="text-sm">Hints</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        {isVisible && (
          <CardContent className="flex-1 pt-0">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {hintsData.hints.map((hint, index) => (
                  <Card
                    key={index}
                    className="border border-yellow-200 dark:border-yellow-800"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                          onClick={() => toggleHint(index)}
                        >
                          {expandedHints.includes(index) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                        <div className="flex-1">
                          <div className="text-sm font-medium mb-1">
                            Hint {index + 1}
                          </div>
                          {expandedHints.includes(index) && (
                            <div className="text-xs text-muted-foreground">
                              {hint}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
