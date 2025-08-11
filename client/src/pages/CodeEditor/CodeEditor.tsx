import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Play, RotateCcw, Award } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Problem {
  title: string;
  description: string;
  exInput: string;
  exOutput: string;
  _id: string;
}

interface HintResponse {
  hints: string[];
}

export default function CodeEditor() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("testcase");
  const [hint, setHint] = useState<HintResponse | null>(null);
  const [loadingHint, setLoadingHint] = useState(false); // Loading state for hint
  const [loadingResult, setLoadingResult] = useState(false); // Loading state for result
  const [loadingProblem, setLoadingProblem] = useState(true); // Loading state for problem

  const { id } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoadingProblem(true);
        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/v1/questions/${id}`,
          { withCredentials: true }
        );
        setSelectedProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoadingProblem(false);
      }
    };

    if (id) {
      fetchProblem(); // Fetch problem data if 'id' is available
    }
  }, [id]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode("");
  };

  const handleSubmitCode = async () => {
    const body = {
      code,
      language,
      input: selectedProblem?.exInput,
    };

    setLoadingResult(true); // Set loading state to true

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/compiler/compile`,
        body,
        { withCredentials: true }
      );

      // Check for errors in the response and set output accordingly
      if (response.data.stderr) {
        console.error(response.data.stderr);
        setOutput(response.data.stderr); // Set error output
      } else {
        console.log(response.data.stdout);
        setOutput(response.data.stdout); // Set success output

        if (response.data.stdout == selectedProblem?.exOutput) {
          axios.post(
            `${process.env.BACKEND_URL}/api/v1/questions/solve`,
            {
              questionId: id,
            },
            { withCredentials: true }
          );
        }
      }

      console.log("Code executed successfully:", response.data);
    } catch (error) {
      console.error("Error executing code:", error);
      if (error instanceof Error) {
        setOutput("Error executing code: " + error.message); // Set error message
      } else {
        setOutput("Error executing code: " + String(error));
      }
    }
    setLoadingResult(false); // Set loading state to false
    setActiveTab("result");
  };

  const handleResetCode = () => {
    setCode("");
  };

  const handleHint = async () => {
    setLoadingHint(true); // Set loading state to true

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/compiler/hints`,
        {
          code,
          question: selectedProblem?.description,
        },
        { withCredentials: true }
      );

      console.log("Hint response:", response.data);

      setHint(response.data);
    } catch (error) {
      console.error("Error fetching hint:", error);
    }

    setLoadingHint(false); // Set loading state to false
  };

  if (loadingProblem) return <div>Loading problem...</div>;
  if (!selectedProblem) return <div>Problem not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="grid grid-cols-1 xl:grid-cols-2 h-screen">
            {/* Problem Description */}
            <div className="bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Problem Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {selectedProblem.title}
                      </h1>
                    </div>
                  </div>

                  <Separator />

                  {/* Problem Content */}
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="hint">Hint</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="space-y-6">
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {selectedProblem?.description}
                        </p>
                        <Separator className="my-4" />
                        <p>
                          <strong>Note</strong>
                          <ul>
                            <li>Do not include the header files</li>
                            <li>Always use the int main( )</li>
                            <li>
                              Try to use as minimal input statements as possible
                            </li>
                          </ul>
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="hint" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <span>Personalized Hint</span>
                          </CardTitle>
                          <CardDescription className="flex flex-col space-y-2">
                            Based on the submissions hints are below
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={handleHint}
                              disabled={loadingHint}
                            >
                              {loadingHint ? "Loading..." : "Get Hint"}
                            </Button>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {loadingHint ? (
                              <div className="text-gray-500">
                                Fetching hints...
                              </div>
                            ) : (
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {hint?.hints?.map(
                                  (hintText: string, index: number) => (
                                    <li key={index} className="text-sm">
                                      {hintText}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-gray-900 text-white overflow-hidden flex flex-col">
              {/* Editor Header */}
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={language}
                      onValueChange={handleLanguageChange}
                    >
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
                          value="c"
                          className="text-white hover:bg-[#3d3d3d]"
                        >
                          C
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                      onClick={handleResetCode}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleSubmitCode}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                  </div>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="flex-1 p-4">
                <div className="h-full">
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
              </div>

              {/* Bottom Panel */}
              <div className="bg-gray-800 border-t border-gray-700">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="px-4 pt-2">
                    <TabsList className="bg-gray-700">
                      <TabsTrigger
                        value="testcase"
                        className="text-gray-300 data-[state=active]:text-black"
                      >
                        Testcase
                      </TabsTrigger>
                      <TabsTrigger
                        value="result"
                        className="text-gray-300 data-[state=active]:text-black"
                      >
                        Test Result
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Testcase Tab Content */}
                  <TabsContent value="testcase" className="p-4 space-y-4">
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-300">Input</Label>
                          <div className="mt-2 bg-gray-700 p-3 rounded">
                            <code className="text-white">
                              {selectedProblem?.exInput || "input"}
                            </code>
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-300">
                            Expected Output
                          </Label>
                          <div className="mt-2 bg-gray-700 p-3 rounded">
                            <code className="text-white">
                              {selectedProblem?.exOutput || "output"}
                            </code>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Test Result Tab Content */}
                  <TabsContent value="result" className="p-4">
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        <div className="bg-gray-700 p-3 rounded">
                          <div className="text-xs text-gray-400 mb-1">
                            Output:
                          </div>
                          <code className="text-green-400">
                            {loadingResult
                              ? "Running..."
                              : output || "Run the code to see output"}
                          </code>
                        </div>

                        <div className="bg-gray-700 p-3 rounded">
                          <div className="text-xs text-gray-400 mb-1">
                            Expected:
                          </div>
                          <code className="text-green-400">
                            {selectedProblem?.exOutput || "output"}
                          </code>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
