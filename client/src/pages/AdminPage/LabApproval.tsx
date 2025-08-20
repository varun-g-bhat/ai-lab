import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Loader2 } from "lucide-react";
import axios from "axios";

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

  const fetchPendingLabs = async () => {
    try {
      const response = await axios.get(
        "https://ai-lab-2.onrender.com/api/v1/lab/pending",
        { withCredentials: true }
      );
      setLabs(response.data.labs);
    } catch (error: any) {
      toast.error("Failed to fetch pending labs");
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
      const response = await axios.put(
        `https://ai-lab-2.onrender.com/api/v1/lab/approve/${labId}`,
        { action },
        { withCredentials: true }
      );

      if (response.data.success) {
        setLabs(labs.filter((lab) => lab._id !== labId));
        toast.success(`Lab ${action}d successfully`);
      }
    } catch (error: any) {
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
      <h1 className="text-3xl font-bold mb-6">Lab Approval System</h1>

      {labs.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              No pending labs for approval
            </p>
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
                    <p className="text-sm text-gray-500 mt-1">
                      Created by: {lab.createdBy.name} ({lab.createdBy.email})
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {lab.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{lab.description}</p>

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
