import { useState, useEffect } from "react";
import { LabCard } from "@/components/lab/LabCard";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { Lab } from "@/types/lab";
import { Separator } from "@/components/ui/separator";
import { BookOpen, GraduationCap, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "react-toastify";
import { UserDetails } from "@/types/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
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

export function LabListPage() {
  const [enrolledLabs, setEnrolledLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allLabs, setAllLabs] = useState<Lab[]>([]);
  const [requestingJoin, setRequestingJoin] = useState<string | null>(null);
  const [joinedLabs, setJoinedLabs] = useState<string[]>([]); // Track successful join requests
  // State for create lab dialog
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sec, setSec] = useState("");
  const [subject, setSubject] = useState("");
  const [createdLabs, setCreatedLabs] = useState<Lab[]>([]);

  const auth = useSelector((state: RootState) => state.auth);
  const userRole = (auth.userDetails as UserDetails | undefined)?.role || "";
  // console.log("User Role:", userRole);

  // Filter out enrolled labs from all labs to show only non-enrolled labs
  const nonEnrolledLabs = allLabs.filter(
    (lab) => !enrolledLabs.some((enrolled) => enrolled._id === lab._id)
  );

  const handleRequestJoin = async (labId: string) => {
    try {
      setRequestingJoin(labId);
      const response = await axios.post(
        `${"https://ai-lab-2.onrender.com"}/api/v1/lab/enroll`,
        { labId },
        { withCredentials: true }
      );
      console.log("Join request sent:", response.data);
      toast.success("Join request sent successfully!");
      setJoinedLabs((prev) => [...prev, labId]); // Mark this lab as joined
    } catch (err) {
      console.error("Failed to send join request:", err);
      toast.error("Failed to send join request. Please try again.");
    } finally {
      setRequestingJoin(null);
    }
  };

  const fetchAllLabs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${"https://ai-lab-2.onrender.com"}/api/v1/lab/all`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setAllLabs(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch all labs");
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledLabs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${"https://ai-lab-2.onrender.com"}/api/v1/lab/enrolled`,
        { withCredentials: true }
      );
      console.log(response.data);
      setEnrolledLabs(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch enrolled labs"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchLabCreatedByUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${"https://ai-lab-2.onrender.com"}/api/v1/lab/created`,
        { withCredentials: true }
      );
      console.log(response.data);
      setCreatedLabs(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch created labs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledLabs();
    fetchAllLabs();
    fetchLabCreatedByUser();
  }, []);

  const handleCreateLab = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.post(
        `${"https://ai-lab-2.onrender.com"}/api/v1/lab/create`,
        {
          title,
          description,
          sec,
          subject,
        },
        { withCredentials: true }
      );
      console.log("Lab created successfully:", response.data);
      toast.success("Lab created successfully!");
      setTitle("");
      setDescription("");
      setSec("");
      setSubject("");
      fetchAllLabs();
    } catch (err) {
      console.error("Failed to create lab:", err);
      toast.error("Failed to create lab. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Lab Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your lab assignments and explore available courses
        </p>
      </div>

      {userRole === "teacher" || userRole === "admin" ? (
        <div className="mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create a new lab</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new lab</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new lab and click create when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateLab}>
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
                    <Label htmlFor="class-section">Class with Section</Label>
                    <Input
                      id="class-section"
                      name="class-section"
                      value={sec}
                      onChange={(e) => setSec(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
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

      {/* Available Labs Section (Non-enrolled) */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Available Labs</h2>
        </div>

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={fetchAllLabs} />}

        {!loading && !error && (
          <>
            {nonEnrolledLabs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Available Labs</h3>
                <p className="text-muted-foreground">
                  You are enrolled in all available labs or no labs are
                  available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonEnrolledLabs.map((lab) => (
                  <Card
                    key={lab._id}
                    className="transition-all duration-200 hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-semibold line-clamp-1">
                          {lab.title}
                        </CardTitle>
                        <Badge variant="secondary" className="ml-2 shrink-0">
                          {lab.labcode}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {lab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{lab.subject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>Section {lab.sec}</span>
                        </div>
                      </div>
                      <div className="mb-3 text-xs text-muted-foreground">
                        Created: {new Date(lab.createdAt).toLocaleDateString()}
                      </div>

                      {userRole === "student" && (
                        <Button
                          className="w-full"
                          onClick={() => handleRequestJoin(lab._id)}
                          disabled={
                            requestingJoin === lab._id ||
                            joinedLabs.includes(lab._id)
                          }
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {joinedLabs.includes(lab._id)
                            ? "Request Sent"
                            : requestingJoin === lab._id
                            ? "Requesting..."
                            : "Request to Join"}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <Separator className="my-8" />

      {/* Enrolled Labs Section */}
      {userRole === "student" && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">My Enrolled Labs</h2>
          </div>

          {loading && <LoadingSpinner />}

          {error && (
            <ErrorMessage message={error} onRetry={fetchEnrolledLabs} />
          )}

          {!loading && !error && (
            <>
              {enrolledLabs.length === 0 ? (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Enrolled Labs</h3>
                  <p className="text-muted-foreground">
                    You haven't enrolled in any labs yet. Browse the available
                    labs above to get started.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledLabs.map((lab) => (
                    <LabCard key={lab._id} lab={lab} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}

      {userRole === "teacher" ||
        (userRole === "admin" && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">My Created Labs</h2>
            </div>

            {loading && <LoadingSpinner />}

            {error && (
              <ErrorMessage message={error} onRetry={fetchLabCreatedByUser} />
            )}

            {!loading && !error && (
              <>
                {createdLabs.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No Created Labs
                    </h3>
                    <p className="text-muted-foreground">
                      You haven't created any labs yet. Browse the available
                      labs above to get started.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {createdLabs.map((lab) => (
                      <LabCard key={lab._id} lab={lab} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        ))}
    </div>
  );
}
