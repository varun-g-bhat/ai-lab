import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Users,
  BarChart3,
  Code,
  CheckCircle,
  BookOpen,
  Target,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  Star,
  Play,
  Monitor,
  UserCheck,
  Settings,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Now Available
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Streamline Your
            <span className="text-primary block">Lab Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Empower educators and students with a comprehensive platform for
            managing programming labs, tracking progress, and fostering
            collaborative learning experiences.
          </p>

          {/* Hero Image Placeholder */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage programming labs efficiently and
              effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Student Dashboard</CardTitle>
                <CardDescription>
                  Intuitive interface for students to access labs, submit
                  solutions, and track their progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Browse available labs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Submit code solutions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Real-time progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Teacher Analytics</CardTitle>
                <CardDescription>
                  Comprehensive analytics and insights into student performance
                  and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Performance visualizations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Student progress reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Engagement metrics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Advanced user role management with granular permissions and
                  access control
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Role-based access control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Bulk user operations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Permission management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Code className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Lab Creation</CardTitle>
                <CardDescription>
                  Easy-to-use lab creation tools with support for multiple
                  programming languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multi-language support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automated testing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Custom grading criteria
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Detailed progress tracking with milestone achievements and
                  performance insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Milestone tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Achievement badges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Performance analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>
                  Enterprise-grade security with data encryption and privacy
                  compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Data encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    GDPR compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Secure authentication
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed to benefit students, teachers, and administrators alike
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* For Students */}
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">For Students</CardTitle>
                <CardDescription>
                  Enhance your learning experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-left">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Interactive Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Engage with hands-on programming challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Track Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor your improvement over time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <UserCheck className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Instant Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Get immediate results on your submissions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Teachers */}
            <Card className="text-center border-primary/20">
              <CardHeader>
                <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">For Teachers</CardTitle>
                <CardDescription>
                  Streamline your teaching workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-left">
                  <BarChart3 className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Data-Driven Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Make informed decisions with analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <Zap className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Automated Grading</h4>
                    <p className="text-sm text-muted-foreground">
                      Save time with automatic assessment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <Target className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Personalized Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Tailor content to individual needs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Administrators */}
            <Card className="text-center">
              <CardHeader>
                <Settings className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">For Administrators</CardTitle>
                <CardDescription>
                  Manage your institution efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-left">
                  <Users className="h-5 w-5 text-cyan-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">User Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Control access and permissions easily
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Security & Compliance</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure data protection and privacy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <TrendingUp className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Institutional Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Track performance across departments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
