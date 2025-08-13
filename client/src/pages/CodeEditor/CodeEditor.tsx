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
import { Badge } from "@/components/ui/badge";

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
  const [loadingQuiz, setLoadingQuiz] = useState(false); // Loading state for quiz
  const [quiz, setQuiz] = useState<any>(null);
  const [submissionStatus, setSubmissionStatus] = useState<{
    isCorrect: boolean | null;
    message: string;
  }>({ isCorrect: null, message: "" });
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoadingProblem(true);
        const response = await axios.get(
          `${"https://ai-lab-1-x6f6.onrender.com"}/api/v1/questions/${id}`,
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
        `https://ai-lab-1-x6f6.onrender.com/api/v1/compiler/compile`,
        body,
        { withCredentials: true }
      );

      // Check for errors in the response and set output accordingly
      let actualOutput = "";
      let hasError = false;

      if (response.data.stderr) {
        console.error(response.data.stderr);
        setOutput(response.data.stderr); // Set error output
        actualOutput = response.data.stderr;
        hasError = true;
      } else {
        console.log(response.data.stdout);
        setOutput(response.data.stdout); // Set success output
        actualOutput = response.data.stdout;
      }

      // Determine if the solution is correct
      const isCorrect = !hasError && actualOutput == selectedProblem?.exOutput;
      console.log(isCorrect);

      // Send submission data to backend
      try {
        await axios.post(
          `https://ai-lab-1-x6f6.onrender.com/api/v1/questions/solve`,
          {
            questionId: id,
            code: code,
            language: language,
            output: actualOutput,
            expectedOutput: selectedProblem?.exOutput || "",
            isCorrect: isCorrect,
          },
          { withCredentials: true }
        );

        if (isCorrect) {
          console.log("✅ Correct solution! Question marked as solved.");
          setSubmissionStatus({
            isCorrect: true,
            message: "Correct solution! Question solved successfully.",
          });
        } else {
          console.log("❌ Incorrect solution. Try again!");
          setSubmissionStatus({
            isCorrect: false,
            message: "Incorrect solution. Keep trying!",
          });
        }

        // Refresh submissions list
        fetchSubmissions();
      } catch (submissionError) {
        console.error("Error submitting solution:", submissionError);
        setSubmissionStatus({
          isCorrect: false,
          message: "Error submitting solution. Please try again.",
        });
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
        `https://ai-lab-ihei.onrender.com/api/v1/aitutor/generate/hints?code=${encodeURIComponent(
          code
        )}&question=${encodeURIComponent(selectedProblem?.description ?? "")}`,

        { withCredentials: true }
      );

      console.log("Hint response:", response.data);

      setHint(response.data);
    } catch (error) {
      console.error("Error fetching hint:", error);
    }

    setLoadingHint(false); // Set loading state to false
  };

  const fetchQuiz = async () => {
    try {
      setLoadingQuiz(true);

      // First try to fetch existing quiz
      const existingQuizResponse = await axios.get(
        `https://ai-lab-1-x6f6.onrender.com/api/v1/compiler/quiz`,
        { withCredentials: true }
      );

      if (existingQuizResponse.data && existingQuizResponse.data.length > 0) {
        console.log("Existing quiz found:", existingQuizResponse.data);
        setQuiz(existingQuizResponse.data[0]); // Take the first quiz
      } else {
        // Generate new quiz if none exists
        const generateResponse = await axios.post(
          `https://ai-lab-1-x6f6.onrender.com/api/v1/compiler/quiz`,
          {
            questionId: selectedProblem?._id,
          },
          { withCredentials: true }
        );

        console.log("Generated quiz:", generateResponse.data);
        setQuiz(generateResponse.data);
      }
    } catch (error) {
      console.error("Error fetching/generating quiz:", error);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleFetchQuiz = () => {
    fetchQuiz();
  };

  const fetchSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      const response = await axios.get(
        `https://ai-lab-1-x6f6.onrender.com/api/v1/questions/submissions/${id}`,
        { withCredentials: true }
      );
      console.log("Submissions response:", response.data);
      setSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setSubmissions([]);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubmissions();
    }
  }, [id]);

  console.log("Submission status:", submissionStatus);

  if (loadingProblem) return <div>Loading problem...</div>;
  if (!selectedProblem) return <div>Problem not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            {/* Problem Description */}
            <div className="bg-white border-r border-gray-200 overflow-y-auto order-2 lg:order-1">
              <div className="p-4 md:p-6">
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
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="hint">Hint</TabsTrigger>
                      <TabsTrigger value="quiz">Quiz</TabsTrigger>
                      <TabsTrigger value="submissions">Submissions</TabsTrigger>
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

                    <TabsContent value="quiz" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <span>Viva Questions</span>
                          </CardTitle>
                          <CardDescription>
                            {quiz?.testName && (
                              <div className="font-semibold text-lg">
                                {quiz.testName}
                              </div>
                            )}
                            {quiz?.testDescription && (
                              <div className="text-muted-foreground mb-2">
                                {quiz.testDescription}
                              </div>
                            )}
                            {quiz?.difficulty && (
                              <Badge variant="secondary" className="mr-2">
                                Difficulty: {quiz.difficulty}
                              </Badge>
                            )}
                            {quiz?.totalQuestions && (
                              <Badge variant="outline">
                                Total Questions: {quiz.totalQuestions}
                              </Badge>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={handleFetchQuiz}
                              disabled={loadingQuiz}
                            >
                              {loadingQuiz ? "Loading..." : "Get Quiz"}
                            </Button>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {loadingQuiz ? (
                              <div className="text-gray-500">
                                Fetching quiz questions...
                              </div>
                            ) : quiz?.questions?.length > 0 ? (
                              quiz.questions.map((q: any, _: number) => {
                                const [showAnswer, setShowAnswer] =
                                  useState(false);
                                return (
                                  <div
                                    key={q.questionNo}
                                    className="border rounded-lg p-4 bg-gray-50"
                                  >
                                    <div className="font-semibold mb-2">
                                      Q{q.questionNo}. {q.question}
                                    </div>
                                    <ul className="list-decimal pl-5 mb-2">
                                      {q.options.map(
                                        (opt: string, i: number) => (
                                          <li key={i} className="text-sm mb-1">
                                            {opt}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setShowAnswer(!showAnswer)}
                                      className="mb-2"
                                    >
                                      {showAnswer
                                        ? "Hide Answer"
                                        : "Show Answer"}
                                    </Button>
                                    {showAnswer && (
                                      <div className="text-green-700 font-medium">
                                        Answer: {q.answer}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-muted-foreground">
                                No quiz questions available.
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="submissions" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-blue-500" />
                            <span>Previous Submissions</span>
                          </CardTitle>
                          <CardDescription>
                            View all your previous attempts for this question
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {loadingSubmissions ? (
                              <div className="text-gray-500">
                                Loading submissions...
                              </div>
                            ) : submissions && submissions.length > 0 ? (
                              submissions
                                .slice()
                                .reverse()
                                .map((submission: any, index: number) => (
                                  <div
                                    key={index}
                                    className="border rounded-lg p-4 bg-gray-50"
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center space-x-2">
                                        <Badge
                                          variant={
                                            submission.isCorrect
                                              ? "default"
                                              : "destructive"
                                          }
                                          className={
                                            submission.isCorrect
                                              ? "bg-green-100 text-green-800 border-green-300"
                                              : "bg-red-100 text-red-800 border-red-300"
                                          }
                                        >
                                          {submission.isCorrect
                                            ? "✓ Correct"
                                            : "✗ Incorrect"}
                                        </Badge>
                                        <Badge variant="outline">
                                          {submission.language.toUpperCase()}
                                        </Badge>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {new Date(
                                          submission.submittedAt
                                        ).toLocaleString()}
                                      </span>
                                    </div>

                                    <div className="space-y-2">
                                      <div>
                                        <Label className="text-sm font-medium">
                                          Code:
                                        </Label>
                                        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                                          <code>{submission.code}</code>
                                        </pre>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium">
                                            Output:
                                          </Label>
                                          <pre className="bg-gray-100 p-2 rounded text-xs">
                                            <code>{submission.output}</code>
                                          </pre>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">
                                            Expected:
                                          </Label>
                                          <pre className="bg-gray-100 p-2 rounded text-xs">
                                            <code>
                                              {submission.expectedOutput}
                                            </code>
                                          </pre>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="text-center py-8">
                                <div className="text-gray-400 mb-2">
                                  <Award className="h-12 w-12 mx-auto mb-4" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">
                                  No submissions yet
                                </h3>
                                <p className="text-muted-foreground">
                                  You haven't submitted any code for this
                                  question yet. Write some code and click "Run"
                                  to get started!
                                </p>
                              </div>
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
            <div className="bg-gray-900 text-white overflow-hidden flex flex-col order-1 lg:order-2 h-96 lg:h-full">
              {/* Editor Header */}
              <div className="bg-gray-800 border-b border-gray-700 p-2 md:p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <Select
                      value={language}
                      onValueChange={handleLanguageChange}
                    >
                      <SelectTrigger className="w-20 md:w-28 bg-[#1a1a1a] border-[#3d3d3d] text-white">
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

                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white text-xs md:text-sm"
                      onClick={handleResetCode}
                    >
                      <RotateCcw className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Reset</span>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs md:text-sm"
                      onClick={handleSubmitCode}
                      disabled={loadingResult}
                    >
                      <Play className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {loadingResult ? "Running..." : "Run"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="flex-1 p-2 md:p-4">
                <div className="h-full">
                  <Editor
                    height="100%"
                    defaultLanguage={language}
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || "")}
                    options={{
                      fontSize: window.innerWidth < 768 ? 12 : 14,
                      minimap: { enabled: window.innerWidth >= 1024 },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      wordWrap: "on",
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
                  <div className="px-2 md:px-4 pt-2">
                    <TabsList className="bg-gray-700 w-full md:w-auto">
                      <TabsTrigger
                        value="testcase"
                        className="text-gray-300 data-[state=active]:text-black text-xs md:text-sm"
                      >
                        Test
                      </TabsTrigger>
                      <TabsTrigger
                        value="result"
                        className="text-gray-300 data-[state=active]:text-black text-xs md:text-sm"
                      >
                        Result
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Testcase Tab Content */}
                  <TabsContent
                    value="testcase"
                    className="p-2 md:p-4 space-y-4"
                  >
                    <ScrollArea className="h-32 md:h-64">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-300 text-xs md:text-sm">
                            Input
                          </Label>
                          <div className="mt-2 bg-gray-700 p-2 md:p-3 rounded">
                            <code className="text-white text-xs md:text-sm">
                              {selectedProblem?.exInput || "input"}
                            </code>
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-300 text-xs md:text-sm">
                            Expected Output
                          </Label>
                          <div className="mt-2 bg-gray-700 p-2 md:p-3 rounded">
                            <code className="text-white text-xs md:text-sm">
                              {selectedProblem?.exOutput || "output"}
                            </code>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Test Result Tab Content */}
                  <TabsContent value="result" className="p-2 md:p-4">
                    <ScrollArea className="h-32 md:h-64">
                      <div className="space-y-4">
                        {submissionStatus.message && (
                          <div
                            className={`p-2 md:p-3 rounded ${
                              submissionStatus.isCorrect
                                ? "bg-green-800 text-green-100"
                                : "bg-red-800 text-red-100"
                            }`}
                          >
                            <div className="text-xs md:text-sm">
                              {submissionStatus.message}
                            </div>
                          </div>
                        )}

                        <div className="bg-gray-700 p-2 md:p-3 rounded">
                          <div className="text-xs text-gray-400 mb-1">
                            Output:
                          </div>
                          <code className="text-green-400 text-xs md:text-sm break-all">
                            {loadingResult
                              ? "Running..."
                              : output || "Run the code to see output"}
                          </code>
                        </div>

                        <div className="bg-gray-700 p-2 md:p-3 rounded">
                          <div className="text-xs text-gray-400 mb-1">
                            Expected:
                          </div>
                          <code className="text-green-400 text-xs md:text-sm break-all">
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
