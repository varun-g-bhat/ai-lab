import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Loader2 } from "lucide-react";
import apiClient from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserDetails } from "@/types/auth";

interface Lab {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  createdBy: {
    name: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

const LabApproval = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const auth = useSelector((state: RootState) => state.auth);
  const userRole = (auth.userDetails as UserDetails | undefined)?.role || "";

  const fetchPendingLabs = async () => {
    try {
      console.log("Fetching pending labs...");
      const response = await apiClient.get("/api/v1/lab/pending");
      console.log("Pending labs response:", response.data);
      setLabs(response.data.labs || []);
    } catch (error: any) {
      console.error("Error fetching pending labs:", error);
      console.error("Error response:", error.response);
      toast.error(error.response?.data?.message || "Failed to fetch pending labs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLabs();
  }, []);

  const handleApproval = async (
    labId: string,
    action: "approve" | "reject"
  ) => {
    setActionLoading(labId);

    try {
      const response = await apiClient.put(
        `/api/v1/lab/approve/${labId}`,
        { action }
      );

      if (response.data.success) {
        setLabs(labs.filter((lab) => lab._id !== labId));
        toast.success(`Lab ${action}d successfully`);
      }
    } catch (error: any) {
      console.error(`Error ${action}ing lab:`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} lab`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {userRole === "admin" ? "Lab Approval System" : "My Lab Approvals"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "admin" 
              ? "Review and approve or reject all lab submissions"
              : "Review and approve or reject labs you have created"}
          </p>
        </div>
        <Button
          onClick={fetchPendingLabs}
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
          Refresh
        </Button>
      </div>

      {labs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No Pending Labs</h3>
              <p className="text-muted-foreground">
                {userRole === "admin" 
                  ? "There are currently no labs waiting for approval"
                  : "You don't have any labs waiting for approval"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {labs.map((lab) => (
            <Card key={lab._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{lab.title}</CardTitle>
                    {userRole === "admin" && (
                      <p className="text-sm text-gray-500 mt-1">
                        Created by: {lab.createdBy.name} ({lab.createdBy.email})
                      </p>
                    )}
                    {userRole === "teacher" && (
                      <p className="text-sm text-blue-600 mt-1">
                        Your Lab
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Badge variant="outline">
                      {lab.difficulty}
                    </Badge>
                    {userRole === "admin" && (
                      <Badge variant="secondary">
                        Admin Review
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{lab.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(lab.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    <Badge variant="outline">{lab.status}</Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleApproval(lab._id, "approve")}
                    disabled={actionLoading === lab._id}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {actionLoading === lab._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Approve"
                    )}
                  </Button>

                  <Button
                    onClick={() => handleApproval(lab._id, "reject")}
                    disabled={actionLoading === lab._id}
                    variant="destructive"
                  >
                    {actionLoading === lab._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Reject"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabApproval;
