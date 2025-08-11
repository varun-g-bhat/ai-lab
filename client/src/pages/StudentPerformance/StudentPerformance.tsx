"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  GraduationCap,
  Loader2,
  AlertCircle,
  BarChart3,
  PieChartIcon,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Types
interface StudentPerformance {
  solvedCount: number;
  userId: string;
  username: string;
}

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2 text-muted-foreground">Loading...</span>
  </div>
);

// Error Component
const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <Alert variant="destructive" className="max-w-md mx-auto">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription className="mt-2">
      {message}
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-2 w-full bg-transparent"
        >
          Try Again
        </Button>
      )}
    </AlertDescription>
  </Alert>
);

// Teacher Dashboard Component
const TeacherDashboard: React.FC = () => {
  const [data, setData] = useState<StudentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: labId } = useParams<{ id: string }>();

  // const labId = "68919b4ba676ab62a8a77864";

  const fetchTeacherDashboard = async () => {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/v1/merge-all/teacher-dashboard?labId=${labId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch teacher dashboard data");
    }

    return response.data;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTeacherDashboard();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching teacher dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare chart data
  const barChartData = data.map((student) => ({
    name: student.username,
    solved: student.solvedCount,
  }));

  const pieChartData = data.map((student) => ({
    name: student.username,
    value: student.solvedCount,
  }));

  const totalSolved = data.reduce(
    (sum, student) => sum + student.solvedCount,
    0
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          Teacher Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor student lab performance and progress
        </p>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={fetchData} />
        </div>
      )}

      {/* Lab ID Input */}
      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lab Configuration</CardTitle>
          <CardDescription>
            Enter the lab ID to view student performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="labId" className="block text-sm font-medium mb-2">
                Lab ID
              </label>
              <Input id="labId" placeholder="Enter lab ID" />
            </div>
            <Button onClick={fetchData} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Questions Solved
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.length > 0 ? (totalSolved / data.length).toFixed(1) : "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Performance Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
          <CardDescription>
            Individual student progress and solved questions count
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead className="text-right">Questions Solved</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student) => (
                <TableRow key={student.userId}>
                  <TableCell className="font-medium">
                    {student.username}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.userId}
                  </TableCell>
                  <TableCell className="text-right">
                    {student.solvedCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        student.solvedCount >= 2
                          ? "default"
                          : student.solvedCount >= 1
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {student.solvedCount >= 2
                        ? "Excellent"
                        : student.solvedCount >= 1
                        ? "Good"
                        : "Needs Improvement"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Bar Chart</CardTitle>
            <CardDescription>Questions solved by each student</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="solved" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>
              Percentage distribution of solved questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
