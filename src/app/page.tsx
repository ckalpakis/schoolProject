import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import CourseCard from "./components/CourseCard";
import AuthButton from "./components/AuthButton";
import MajorQuiz from "./components/MajorQuiz";
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Play,
  Zap,
  Heart,
  Target,
} from "lucide-react";

// Loading skeleton for courses
function CoursesLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="animate-pulse bg-white border-4 border-gray-200 shadow-lg"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-7 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="flex gap-2 mb-3">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-4 mb-6">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-14"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-full w-full"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Server Component to fetch courses
async function FeaturedCourses() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .limit(3)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Unable to load courses at this time.
        </p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No courses available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      data-testid="featured-courses"
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b-4 border-purple-400">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 font-black text-2xl text-purple-600"
            >
              <div className="bg-purple-100 p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              Try-a-Major
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/test"
                className="text-sm text-gray-600 hover:text-purple-600 font-medium"
              >
                Test Suite
              </Link>
              <AuthButton />
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="py-20 lg:py-32 relative overflow-hidden"
          data-testid="hero-section"
        >
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-bounce"></div>
          <div
            className="absolute top-32 right-20 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-300 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 right-10 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Badge className="bg-blue-400 text-white text-sm px-4 py-2 rounded-full font-bold border-0 shadow-lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  NEW & EXCITING!
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white drop-shadow-lg">
                Find Your
                <span className="text-blue-200 block lg:inline lg:ml-4">
                  Dream Major! 🎓
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                Tired of boring course catalogs? Jump into fun, interactive
                lessons that show you what studying different majors is REALLY
                like!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="border-4 bg-blue-400 hover:bg-blue-500 text-white text-xl px-10 py-6 rounded-full font-black shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Start Learning!
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-4 bg-purple-400 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-10 py-6 rounded-full font-black shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Target className="mr-3 h-6 w-6" />
                  How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Major Quiz Section */}
        <MajorQuiz />

        {/* Features Section */}
        <section className="py-20" data-testid="features-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg">
                Why students love us!
              </h2>
              <p className="text-xl text-white/90 font-medium">
                No more guessing games! Experience what it&apos;s REALLY like to
                study different majors.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center bg-white/95 backdrop-blur-sm border-4 border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="mx-auto mb-6 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-black text-blue-600 mb-3">
                    Super Interactive!
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg font-medium">
                    Hands-on projects, quizzes, and real scenarios - no boring
                    lectures here!
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center bg-white/95 backdrop-blur-sm border-4 border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="mx-auto mb-6 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-black text-purple-600 mb-3">
                    We Care About YOU
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg font-medium">
                    Created by real students and professors who actually care
                    about your future!
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center bg-white/95 backdrop-blur-sm border-4 border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="mx-auto mb-6 w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-black text-indigo-600 mb-3">
                    Find Your Fit
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg font-medium">
                    Discover what you&apos;re passionate about before spending
                    years on the wrong path!
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-20" data-testid="courses-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Popular Major Adventures!
              </h2>
              <p className="text-xl text-white/90 font-medium">
                Jump into these fan-favorite experiences and see what sparks
                your interest!
              </p>
            </div>
            <Suspense fallback={<CoursesLoading />}>
              <FeaturedCourses />
            </Suspense>
            <div className="text-center mt-16">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-6 rounded-full font-black shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                <BookOpen className="mr-3 h-6 w-6" />
                Explore All Majors
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" data-testid="cta-section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Ready to discover your passion?
            </h2>
            <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto font-medium">
              Join over 10,000 students who found their perfect major through
              our fun, interactive platform!
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 rounded-full font-black shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Your Journey - FREE!
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-3 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-xl">Try-a-Major</span>
            </div>
            <div className="text-gray-400 font-medium">
              © 2024 Try-a-Major. Made with love for students everywhere.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
