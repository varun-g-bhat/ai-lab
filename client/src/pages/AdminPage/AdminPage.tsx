"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Search } from "lucide-react";
import apiClient from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserDetails } from "@/types/auth";
import LabApproval from "./LabApproval";

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
}
type UserRole = "all" | "student" | "teacher" | "admin";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<UserRole>("all");

  const auth = useSelector((state: RootState) => state.auth);
  const userRole = (auth.userDetails as UserDetails | undefined)?.role || "";

  // Debug logging
  useEffect(() => {
    console.log("Auth state:", auth);
    console.log("User role:", userRole);
  }, [auth, userRole]);

  // Fetch users data once when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/api/v1/auth/all-users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Only run once on component mount

  // Filter users based on search term and active tab
  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role tab
    if (activeTab !== "all") {
      filtered = filtered.filter((user) => user.role === activeTab);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, activeTab, users]); // Only run when these dependencies change

  const handleRoleChange = async (
    userId: string,
    userRole: "student" | "teacher" | "admin"
  ) => {
    try {
      const response = await apiClient.post("/api/v1/auth/change-role", {
        userId,
        newRole: userRole,
      });

      if (response.status === 200) {
        console.log("User role updated successfully");
        // Update the local state to reflect the change
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: userRole } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "teacher":
        return "default";
      case "student":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRoleCount = (role: UserRole) => {
    if (role === "all") return users.length;
    return users.filter((user) => user.role === role).length;
  };

  if (userRole !== "admin" && userRole !== "teacher") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have the required privileges to access this page.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Current role: {userRole || "Not authenticated"}
            </p>
            <p className="text-sm text-muted-foreground">
              Required: Admin or Teacher
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          {userRole === "admin" ? "Admin Dashboard" : "Teacher Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {userRole === "admin" 
            ? "Manage user roles and permissions across the platform" 
            : "Manage your labs and approve student enrollments"}
        </p>
      </div>

      {/* User Management - Only show for admins */}
      {userRole === "admin" && (
        <>
          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users by username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Role Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Filter and manage users by their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as UserRole)}
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    All ({getRoleCount("all")})
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex items-center gap-2">
                    Students ({getRoleCount("student")})
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex items-center gap-2">
                    Teachers ({getRoleCount("teacher")})
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    Admins ({getRoleCount("admin")})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  {filteredUsers.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No users found</h3>
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? "Try adjusting your search terms."
                          : "No users match the selected criteria."}
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Current Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {filteredUsers.indexOf(user) + 1}
                              {user._id}
                            </TableCell>
                            <TableCell>
                              <Badge variant={getRoleBadgeVariant(user.role)}>
                                {user.role.charAt(0).toUpperCase() +
                                  user.role.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Select
                                value={user.role}
                                onValueChange={(
                                  newRole: "student" | "teacher" | "admin"
                                ) => handleRoleChange(user._id, newRole)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="student">Student</SelectItem>
                                  <SelectItem value="teacher">Teacher</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      {/* Dashboard Tabs */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            {userRole === "admin" ? "Admin Dashboard" : "Teacher Dashboard"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lab-approval" className="w-full">
            <TabsList className={`grid w-full ${userRole === "admin" ? "grid-cols-3" : "grid-cols-2"}`}>
              <TabsTrigger value="lab-approval">Lab Approval</TabsTrigger>
              {userRole === "admin" && (
                <TabsTrigger value="users">User Management</TabsTrigger>
              )}
              <TabsTrigger value="analytics">
                {userRole === "admin" ? "Analytics" : "My Labs"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lab-approval">
              <LabApproval />
            </TabsContent>

            {userRole === "admin" && (
              <TabsContent value="users">
                <div className="text-center p-8">
                  <p className="text-gray-500">User management coming soon...</p>
                </div>
              </TabsContent>
            )}

            <TabsContent value="analytics">
              <div className="text-center p-8">
                <p className="text-gray-500">
                  {userRole === "admin" 
                    ? "Analytics dashboard coming soon..."
                    : "Lab management features coming soon..."}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
