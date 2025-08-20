// // "use client";
// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Maximize2, RotateCcw, Menu, Bookmark, Clock } from "lucide-react";

// // const cppCode = `class Solution {
// // public:
// //     vector<int> twoSum(vector<int>& nums, int target) {

// //     }
// // };`;

// // export function CodeEditorPanel() {
// //   const [language, setLanguage] = useState("cpp");

// //   return (
// //     <div className="h-full bg-[#1a1a1a] flex flex-col">
// //       {/* Header */}
// //       <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
// //         <div className="flex items-center gap-3">
// //           <div className="flex items-center gap-2">
// //             <span className="text-white font-medium">Code</span>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             className="text-gray-400 hover:text-white"
// //           >
// //             <Menu className="w-4 h-4" />
// //           </Button>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             className="text-gray-400 hover:text-white"
// //           >
// //             <Bookmark className="w-4 h-4" />
// //           </Button>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             className="text-gray-400 hover:text-white"
// //           >
// //             <Clock className="w-4 h-4" />
// //           </Button>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             className="text-gray-400 hover:text-white"
// //           >
// //             <RotateCcw className="w-4 h-4" />
// //           </Button>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             className="text-gray-400 hover:text-white"
// //           >
// //             <Maximize2 className="w-4 h-4" />
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Language Selector */}
// //       <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
// //         <div className="flex items-center gap-3">
// //           <Select value={language} onValueChange={setLanguage}>
// //             <SelectTrigger className="w-24 bg-[#1a1a1a] border-[#3d3d3d] text-white">
// //               <SelectValue />
// //             </SelectTrigger>
// //             <SelectContent className="bg-[#2d2d2d] border-[#3d3d3d]">
// //               <SelectItem value="cpp" className="text-white hover:bg-[#3d3d3d]">
// //                 C++
// //               </SelectItem>
// //               <SelectItem
// //                 value="java"
// //                 className="text-white hover:bg-[#3d3d3d]"
// //               >
// //                 Java
// //               </SelectItem>
// //               <SelectItem
// //                 value="python"
// //                 className="text-white hover:bg-[#3d3d3d]"
// //               >
// //                 Python
// //               </SelectItem>
// //               <SelectItem
// //                 value="javascript"
// //                 className="text-white hover:bg-[#3d3d3d]"
// //               >
// //                 JavaScript
// //               </SelectItem>
// //             </SelectContent>
// //           </Select>

// //           <div className="flex items-center gap-2 text-gray-400">
// //             <span className="text-sm">Auto</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Code Editor */}
// //       <div className="flex-1 relative">
// //         <div className="absolute inset-0 flex">
// //           {/* Line Numbers */}
// //           <div className="w-12 bg-[#1a1a1a] border-r border-[#3d3d3d] p-3 text-right">
// //             <div className="font-mono text-sm text-gray-500 space-y-0 leading-6">
// //               <div>1</div>
// //               <div>2</div>
// //               <div>3</div>
// //               <div>4</div>
// //               <div>5</div>
// //               <div>6</div>
// //             </div>
// //           </div>

// //           {/* Code Content */}
// //           <div className="flex-1 p-3">
// //             <pre className="font-mono text-sm leading-6 text-white">
// //               <code>
// //                 <span className="text-blue-400">class</span>{" "}
// //                 <span className="text-yellow-300">Solution</span> {"{"}
// //                 {"\n"}
// //                 <span className="text-blue-400">public</span>:{"\n"}{" "}
// //                 <span className="text-green-400">vector</span>
// //                 {"<"}
// //                 <span className="text-blue-400">int</span>
// //                 {">"} <span className="text-yellow-300">twoSum</span>(
// //                 <span className="text-green-400">vector</span>
// //                 {"<"}
// //                 <span className="text-blue-400">int</span>
// //                 {">"}& <span className="text-orange-300">nums</span>,{" "}
// //                 <span className="text-blue-400">int</span>{" "}
// //                 <span className="text-orange-300">target</span>) {"{"}
// //                 {"\n"}
// //                 {"\n"} {"}"}
// //                 {"\n"}
// //                 {"}"};
// //               </code>
// //             </pre>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <div className="flex items-center justify-between p-2 border-t border-[#3d3d3d] bg-[#2d2d2d] text-xs text-gray-400">
// //         <span>Saved</span>
// //         <span>Ln 1, Col 1</span>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import Editor from "@monaco-editor/react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Maximize2,
//   RotateCcw,
//   Menu,
//   Bookmark,
//   Clock,
//   Play,
//   Plus,
// } from "lucide-react";
// import axios from "axios";
// import { Input } from "../ui/input";

// export function CodeEditorPanel() {
//   const [activeTab, setActiveTab] = useState("testcase");
//   const [activeCase, setActiveCase] = useState(1);

//   const testCases = [
//     { id: 1, nums: "[2,7,11,15]", target: "9" },
//     { id: 2, nums: "[3,2,4]", target: "6" },
//     { id: 3, nums: "[3,3]", target: "6" },
//   ];

// const [language, setLanguage] = useState("cpp");
// const [code, setCode] = useState("");

// const handleLanguageChange = (value: string) => {
//   setLanguage(value);
//   setCode(code);
// };

// const handleSubmitCode = async () => {
//   const body = {
//     code,
//     language,
//     input: "9",
//   };
//   const response = await axios.post(
//     `${"https://ai-lab-2.onrender.com"}/api/v1/compiler/compile`,
//     body
//   );

//   if (response.data.stderr) {
//     console.error(response.data.stderr);
//   } else {
//     console.log(response.data.stdout);
//   }
// };

//   return (
//     <>
//       <div className="h-full bg-[#1a1a1a] flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
//           <div className="flex items-center gap-3">
//             <span className="text-white font-medium">Code</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-gray-400 hover:text-white"
//             >
//               <RotateCcw
//                 className="w-4 h-4"
//                 onClick={() => {
//                   setCode("");
//                 }}
//               />
//             </Button>
//             <div className="flex items-center gap-3">
//               {/* <Button
//               variant="ghost"
//               size="sm"
//               className="text-gray-300 hover:text-white hover:bg-[#3d3d3d]"
//             >
//               <Play className="w-4 h-4" />
//             </Button> */}

//               <Button
//                 className="bg-green-600 hover:bg-green-700 text-white px-4"
//                 onClick={handleSubmitCode}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Language Selector */}
//         <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
//           <div className="flex items-center gap-3">
//             <Select value={language} onValueChange={handleLanguageChange}>
//               <SelectTrigger className="w-28 bg-[#1a1a1a] border-[#3d3d3d] text-white">
//                 <SelectValue placeholder="Language" />
//               </SelectTrigger>
//               <SelectContent className="bg-[#2d2d2d] border-[#3d3d3d]">
//                 <SelectItem
//                   value="cpp"
//                   className="text-white hover:bg-[#3d3d3d]"
//                 >
//                   C++
//                 </SelectItem>
//                 <SelectItem
//                   value="java"
//                   className="text-white hover:bg-[#3d3d3d]"
//                 >
//                   Java
//                 </SelectItem>
//                 <SelectItem
//                   value="python"
//                   className="text-white hover:bg-[#3d3d3d]"
//                 >
//                   Python
//                 </SelectItem>
//                 <SelectItem
//                   value="javascript"
//                   className="text-white hover:bg-[#3d3d3d]"
//                 >
//                   JavaScript
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Code Editor */}
//         <div className="flex-1">
//           <Editor
//             height="100%"
//             defaultLanguage={language}
//             language={language}
//             value={code}
//             theme="vs-dark"
//             onChange={(value) => setCode(value || "")}
//             options={{
//               fontSize: 14,
//               minimap: { enabled: false },
//               scrollBeyondLastLine: false,
//               automaticLayout: true,
//             }}
//           />
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-2 border-t border-[#3d3d3d] bg-[#2d2d2d] text-xs text-gray-400">
//           <span>Saved</span>
//           <span>Ln 1, Col 1</span>
//         </div>
//       </div>
//       <div className="h-full bg-[#1a1a1a] flex flex-col">
//         {/* Tabs */}
//         <div className="flex border-b border-[#3d3d3d] bg-[#2d2d2d]">
//           <button
//             onClick={() => setActiveTab("testcase")}
//             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === "testcase"
//                 ? "border-green-500 text-white bg-[#1a1a1a]"
//                 : "border-transparent text-gray-400 hover:text-gray-300"
//             }`}
//           >
//             ✅ Testcase
//           </button>
//           <button
//             onClick={() => setActiveTab("result")}
//             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === "result"
//                 ? "border-green-500 text-white bg-[#1a1a1a]"
//                 : "border-transparent text-gray-400 hover:text-gray-300"
//             }`}
//           >
//             Test Result
//           </button>
//         </div>

//         {/* Test Case Selector */}
//         <div className="flex items-center gap-2 p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
//           {testCases.map((testCase) => (
//             <Button
//               key={testCase.id}
//               variant={activeCase === testCase.id ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setActiveCase(testCase.id)}
//               className={
//                 activeCase === testCase.id
//                   ? "bg-[#3d3d3d] text-white"
//                   : "text-gray-400 hover:text-white hover:bg-[#3d3d3d]"
//               }
//             >
//               Case {testCase.id}
//             </Button>
//           ))}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="text-gray-400 hover:text-white hover:bg-[#3d3d3d]"
//           >
//             <Plus className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Test Case Content */}
//         <div className="flex-1 p-4 space-y-4">
//           {testCases
//             .filter((tc) => tc.id === activeCase)
//             .map((testCase) => (
//               <div key={testCase.id} className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-2">
//                     nums =
//                   </label>
//                   <Input
//                     value={testCase.nums}
//                     readOnly
//                     className="bg-[#2d2d2d] border-[#3d3d3d] text-white font-mono"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-2">
//                     target =
//                   </label>
//                   <Input
//                     value={testCase.target}
//                     readOnly
//                     className="bg-[#2d2d2d] border-[#3d3d3d] text-white font-mono"
//                   />
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Footer */}
//         <div className="p-3 border-t border-[#3d3d3d] bg-[#2d2d2d]">
//           <div className="flex items-center justify-between text-xs text-gray-400">
//             <span>Source</span>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-gray-400 hover:text-white"
//             >
//               ℹ️
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // CodePlayground.tsx
// // "use client";

// // import { useState } from "react";
// // import Editor from "@monaco-editor/react";
// // import axios from "axios";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Plus, RotateCcw } from "lucide-react";

// // export default function CodePlayground() {
// //   // Test case state
// //   const [activeTab, setActiveTab] = useState<"testcase" | "result">("testcase");
// //   const [activeCase, setActiveCase] = useState(1);
// //   const testCases = [
// //     { id: 1, nums: "[2,7,11,15]", target: "9" },
// //     { id: 2, nums: "[3,2,4]", target: "6" },
// //     { id: 3, nums: "[3,3]", target: "6" },
// //   ];

// //   // Code editor state
// //   const [language, setLanguage] = useState<
// //     "cpp" | "java" | "python" | "javascript"
// //   >("cpp");
// //   const [code, setCode] = useState("");
// //   const [compileOutput, setCompileOutput] = useState<string | null>(null);

// //   const handleLanguageChange = (value: string) => {
// //     setLanguage(value as any);
// //   };

// const handleSubmitCode = async () => {
//   const current = testCases.find((tc) => tc.id === activeCase)!;
//   const payload = {
//     code,
//     language,
//     // pass nums and target as stdin, separated by newline
//     input: `${current.nums}\n${current.target}`,
//   };

//   try {
//     const response = await axios.post(
//       `${"https://ai-lab-2.onrender.com"}/api/v1/compiler/compile`,
//       payload
//     );

//     if (response.data.stderr) {
//       setCompileOutput(`Error:\n${response.data.stderr}`);
//     } else {
//       setCompileOutput(`Output:\n${response.data.stdout}`);
//     }
//     setActiveTab("result");
//   } catch (err: any) {
//     setCompileOutput(`Request failed:\n${err.message}`);
//     setActiveTab("result");
//   }
// };

// //   return (
// //     <div className="h-screen flex bg-[#1a1a1a] text-white">
// //       {/* Left Panel: Test Cases */}
// //       <div className="w-1/3 flex flex-col border-r border-[#3d3d3d]">
// //         {/* Tabs */}
// //         <div className="flex border-b border-[#3d3d3d] bg-[#2d2d2d]">
// //           <button
// //             onClick={() => setActiveTab("testcase")}
// //             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
// //               activeTab === "testcase"
// //                 ? "border-green-500 text-white bg-[#1a1a1a]"
// //                 : "border-transparent text-gray-400 hover:text-gray-300"
// //             }`}
// //           >
// //             ✅ Testcase
// //           </button>
// //           <button
// //             onClick={() => setActiveTab("result")}
// //             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
// //               activeTab === "result"
// //                 ? "border-green-500 text-white bg-[#1a1a1a]"
// //                 : "border-transparent text-gray-400 hover:text-gray-300"
// //             }`}
// //           >
// //             Test Result
// //           </button>
// //         </div>

// //         {/* Case Selector */}
// //         {activeTab === "testcase" && (
// //           <div className="flex items-center gap-2 p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
// //             {testCases.map((tc) => (
// //               <Button
// //                 key={tc.id}
// //                 variant={activeCase === tc.id ? "default" : "ghost"}
// //                 size="sm"
// //                 onClick={() => setActiveCase(tc.id)}
// //                 className={
// //                   activeCase === tc.id
// //                     ? "bg-[#3d3d3d] text-white"
// //                     : "text-gray-400 hover:text-white hover:bg-[#3d3d3d]"
// //                 }
// //               >
// //                 Case {tc.id}
// //               </Button>
// //             ))}
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               onClick={() => {
// //                 const nextId = testCases.length + 1;
// //                 testCases.push({ id: nextId, nums: "", target: "" });
// //                 setActiveCase(nextId);
// //               }}
// //               className="text-gray-400 hover:text-white hover:bg-[#3d3d3d]"
// //             >
// //               <Plus className="w-4 h-4" />
// //             </Button>
// //           </div>
// //         )}

// //         {/* Case Details or Result */}
// //         <div className="flex-1 p-4 space-y-4 overflow-auto bg-[#1a1a1a]">
// //           {activeTab === "testcase" &&
// //             testCases
// //               .filter((tc) => tc.id === activeCase)
// //               .map((tc) => (
// //                 <div key={tc.id} className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm text-gray-400 mb-2">
// //                       nums =
// //                     </label>
// //                     <Input
// //                       value={tc.nums}
// //                       readOnly
// //                       className="bg-[#2d2d2d] border-[#3d3d3d] text-white font-mono"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-gray-400 mb-2">
// //                       target =
// //                     </label>
// //                     <Input
// //                       value={tc.target}
// //                       readOnly
// //                       className="bg-[#2d2d2d] border-[#3d3d3d] text-white font-mono"
// //                     />
// //                   </div>
// //                 </div>
// //               ))}

// //           {activeTab === "result" && (
// //             <pre className="whitespace-pre-wrap font-mono text-sm">
// //               {compileOutput ?? "No output yet."}
// //             </pre>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         <div className="p-3 border-t border-[#3d3d3d] bg-[#2d2d2d] text-xs text-gray-400">
// //           <div className="flex items-center justify-between">
// //             <span>Source</span>
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               className="text-gray-400 hover:text-white"
// //             >
// //               ℹ️
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Panel: Code Editor */}
// //       <div className="w-2/3 flex flex-col">
// //         {/* Header */}
// //         <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
// //           <span className="text-white font-medium">Code</span>
// //           <div className="flex items-center gap-2">
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               className="text-gray-400 hover:text-white"
// //               onClick={() => setCode("")}
// //             >
// //               <RotateCcw className="w-4 h-4" />
// //             </Button>
// //             <Button
// //               className="bg-green-600 hover:bg-green-700 text-white px-4"
// //               onClick={handleSubmitCode}
// //             >
// //               Submit
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Language Selector */}
// <div className="flex items-center p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
//   <Select value={language} onValueChange={handleLanguageChange}>
//     <SelectTrigger className="w-28 bg-[#1a1a1a] border-[#3d3d3d] text-white">
//       <SelectValue placeholder="Language" />
//     </SelectTrigger>
//     <SelectContent className="bg-[#2d2d2d] border-[#3d3d3d]">
//       <SelectItem value="cpp" className="text-white hover:bg-[#3d3d3d]">
//         C++
//       </SelectItem>
//       <SelectItem
//         value="java"
//         className="text-white hover:bg-[#3d3d3d]"
//       >
//         Java
//       </SelectItem>
//       <SelectItem
//         value="python"
//         className="text-white hover:bg-[#3d3d3d]"
//       >
//         Python
//       </SelectItem>
//       <SelectItem
//         value="javascript"
//         className="text-white hover:bg-[#3d3d3d]"
//       >
//         JavaScript
//       </SelectItem>
//     </SelectContent>
//   </Select>
// </div>

// //         {/* Editor */}
// //         <div className="flex-1">
// //           <Editor
// //             height="100%"
// //             language={language}
// //             value={code}
// //             theme="vs-dark"
// //             onChange={(value) => setCode(value || "")}
// //             options={{
// //               fontSize: 14,
// //               minimap: { enabled: false },
// //               scrollBeyondLastLine: false,
// //               automaticLayout: true,
// //             }}
// //           />
// //         </div>

// //         {/* Editor Footer */}
// //         <div className="flex items-center justify-between p-2 border-t border-[#3d3d3d] bg-[#2d2d2d] text-xs text-gray-400">
// //           <span>Saved</span>
// //           <span>Ln 1, Col 1</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Plus } from "lucide-react";
import axios from "axios";
import { Input } from "../ui/input";

export function CodeEditorPanel() {
  const [activeTab, setActiveTab] = useState("testcase");
  const [activeCase, setActiveCase] = useState(1);

  const testCases = [
    { id: 1, nums: "[2,7,11,15]", target: "9" },
    { id: 2, nums: "[3,2,4]", target: "6" },
    { id: 3, nums: "[3,3]", target: "6" },
  ];

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(code);
  };

  const handleSubmitCode = async () => {
    const body = {
      code,
      language,
      input: "9",
    };
    const response = await axios.post(
      `${"https://ai-lab-2.onrender.com"}/api/v1/compiler/compile`,
      body
    );

    if (response.data.stderr) {
      console.error(response.data.stderr);
    } else {
      console.log(response.data.stdout);
    }
  };

  return (
    <>
      <div className="h-full bg-[#1a1a1a] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Code</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <RotateCcw
                className="w-4 h-4"
                onClick={() => {
                  setCode("");
                }}
              />
            </Button>
            <div className="flex items-center gap-3">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-4"
                onClick={handleSubmitCode}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-between p-3 border-b border-[#3d3d3d] bg-[#2d2d2d]">
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-28 bg-[#1a1a1a] border-[#3d3d3d] text-white">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-[#2d2d2d] border-[#3d3d3d]">
                <SelectItem
                  value="cpp"
                  className="text-white hover:bg-[#3d3d3d]"
                >
                  C++
                </SelectItem>
                <SelectItem
                  value="java"
                  className="text-white hover:bg-[#3d3d3d]"
                >
                  Java
                </SelectItem>
                <SelectItem
                  value="python"
                  className="text-white hover:bg-[#3d3d3d]"
                >
                  Python
                </SelectItem>
                <SelectItem
                  value="javascript"
                  className="text-white hover:bg-[#3d3d3d]"
                >
                  JavaScript
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-2 border-t border-[#3d3d3d] bg-[#2d2d2d] text-xs text-gray-400">
          <span>Saved</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>

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

        {/* Conditional Rendering of Testcase Section */}
        {activeTab === "testcase" && (
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
        )}

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
    </>
  );
}
