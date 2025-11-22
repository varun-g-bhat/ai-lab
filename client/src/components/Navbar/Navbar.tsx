import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/http/authApi";
import { toast } from "react-toastify";
import { toastOptions } from "@/config/toast";
import { logoutUser } from "@/store/userAuth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse, UserDetails } from "@/types/auth";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);
  const userRole = (auth.userDetails as UserDetails | undefined)?.role || "";

  const logoutmutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successful", toastOptions);
      dispatch(logoutUser());
      navigate("/");
    },
    onError: (error: AxiosError) => {
      const errResponse = error.response?.data as ErrorResponse;
      toast.error(errResponse.message, toastOptions);
    },
  });

  const handleLogout = () => {
    logoutmutation.mutate();
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <img
                src="https://i.pinimg.com/736x/70/2d/58/702d58e8529d740ac7b2d146b7ee4baf.jpg"
                className="h-10 me-3"
                alt="FlowBite Logo"
              />
              <span>AI LAB</span>
            </Link>
            <Link
              to="/"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/labs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Lab
            </Link>
            {(userRole === "admin" || userRole === "teacher") && (
              <Link
                to="/admin"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {userRole === "admin" ? "Admin" : "Dashboard"}
              </Link>
            )}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src="" alt="WN" className="h-6 w-6" />
                  <span>AI LAB</span>
                </Link>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
                <Link
                  to="/labs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Lab
                </Link>
                {(userRole === "admin" || userRole === "teacher") && (
                  <Link
                    to="/admin"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {userRole === "admin" ? "Admin" : "Dashboard"}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {!auth.isLogined ? (
              <div className="ml-auto flex-1 sm:flex-initial">
                <div className="flex gap-3 relative">
                  <Link to="/signup">
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto gap-1.5 text-sm"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto gap-1.5 text-sm"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-1">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button variant="secondary">{auth.username}</Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
