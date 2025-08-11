import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { Question } from "@/types/lab";
import { Code, Play, FileText } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserDetails } from "@/types/auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LabDetailPage() {
  const { id: labId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exInput, setExInput] = useState("");
  const [exOutput, setExOutput] = useState("");

  const auth = useSelector((state: RootState) => state.auth);
  const userRole = (auth.userDetails as UserDetails | undefined)?.role || "";

  const handleNavigate = () => {
    navigate(`/performance/${labId}`);
  };

  const handleStartCoding = (questionId: string) => {
    navigate(`/editor/${questionId}`);
  };

  const fetchQuestions = async () => {
    if (!labId) return;

    console.log("Fetching questions for lab:", labId);
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.BACKEND_URL}/api/v1/questions/lab/${labId}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setQuestions(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch questions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [labId]);

  const handleCreateQuestion = async () => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/questions/create`,
        { title, description, labId, exInput, exOutput },
        { withCredentials: true }
      );
      setQuestions((prevQuestions) => [...prevQuestions, response.data]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create question"
      );
    }
  };

  if (!labId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Lab ID not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Lab Questions</h1>
        </div>
        <p className="text-muted-foreground">
          Complete the following programming challenges
        </p>
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} onRetry={fetchQuestions} />}

      {userRole === "teacher" || userRole === "admin" ? (
        <div className="mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create a new question</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new question</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new question and click create when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateQuestion}>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="exInput">Example Input</Label>
                    <Input
                      id="exInput"
                      name="exInput"
                      value={exInput}
                      onChange={(e) => setExInput(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="exOutput">Example Output</Label>
                    <Input
                      id="exOutput"
                      name="exOutput"
                      value={exOutput}
                      onChange={(e) => setExOutput(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline" type="submit">
                      Create New Lab
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}

      {userRole === "teacher" || userRole === "admin" ? (
        <div className="mb-4">
          <Button variant="outline" onClick={handleNavigate}>
            View Lab Performance
          </Button>
        </div>
      ) : null}

      {!loading && !error && (
        <>
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No Questions Available
              </h3>
              <p className="text-muted-foreground">
                This lab doesn't have any questions yet. Check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm">
                  {questions.length} Question{questions.length !== 1 ? "s" : ""}
                </Badge>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {questions.map((question, index) => (
                  <AccordionItem
                    key={question._id}
                    value={question._id}
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <Badge variant="secondary" className="shrink-0">
                          {index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {question.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {question.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {question.description}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
                                Example Input
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <code className="text-sm bg-muted p-2 rounded block font-mono">
                                {question.exInput}
                              </code>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">
                                Expected Output
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <code className="text-sm bg-muted p-2 rounded block font-mono">
                                {question.exOutput}
                              </code>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleStartCoding(question._id)}
                          >
                            <Play className="h-4 w-4" />
                            Start Coding
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </>
      )}
    </div>
  );
}
