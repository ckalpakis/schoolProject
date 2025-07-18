import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import CourseCard from './components/CourseCard'
import { GraduationCap, BookOpen, Users, ArrowRight, Sparkles } from 'lucide-react'

// Loading skeleton for courses
function CoursesLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="flex gap-2 mb-2">
              <div className="h-5 bg-muted rounded w-16"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
            </div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-4 mb-4">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-12"></div>
              <div className="h-4 bg-muted rounded w-14"></div>
            </div>
            <div className="h-10 bg-muted rounded w-full"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Server Component to fetch courses
async function FeaturedCourses() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching courses:', error)
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load courses at this time.</p>
      </div>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No courses available yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="featured-courses">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <GraduationCap className="h-6 w-6" />
              Try-a-Major
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/test" className="text-sm text-muted-foreground hover:text-foreground">
                Test Suite
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24" data-testid="hero-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge variant="secondary" className="text-sm">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New Platform
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Discover Your Perfect{' '}
                <span className="text-primary">Academic Path</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore different majors through interactive courses and lessons. 
                Make informed decisions about your educational journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30" data-testid="features-section">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Try-a-Major?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get hands-on experience with different academic fields before committing to a major.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Interactive Lessons</CardTitle>
                  <CardDescription>
                    Engage with real-world projects and scenarios from each major.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Expert Guidance</CardTitle>
                  <CardDescription>
                    Learn from professionals and educators in each field.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Informed Decisions</CardTitle>
                  <CardDescription>
                    Make confident choices about your academic future.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16" data-testid="courses-section">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Majors
              </h2>
              <p className="text-lg text-muted-foreground">
                Start your exploration with these popular academic programs.
              </p>
            </div>
            <Suspense fallback={<CoursesLoading />}>
              <FeaturedCourses />
            </Suspense>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Majors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground" data-testid="cta-section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Path?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of students who have discovered their perfect major through our platform.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span className="font-semibold">Try-a-Major</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Try-a-Major. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}