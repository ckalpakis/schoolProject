import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, BookOpen } from 'lucide-react'

interface Course {
  id: string
  slug: string
  title: string
  created_at: string
}

interface CourseCardProps {
  course: Course
  className?: string
}

export default function CourseCard({ course, className }: CourseCardProps) {
  // Mock data for demo purposes - in real app, this would come from the database
  const mockStats = {
    lessons: Math.floor(Math.random() * 12) + 3, // 3-15 lessons
    duration: Math.floor(Math.random() * 6) + 2, // 2-8 hours
    students: Math.floor(Math.random() * 500) + 50, // 50-550 students
    level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
    category: course.title.includes('Computer') ? 'Technology' : 
             course.title.includes('Business') ? 'Business' : 
             course.title.includes('Psychology') ? 'Social Science' : 'General'
  }

  return (
    <Card className={`group hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {mockStats.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {mockStats.level}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Discover what it&apos;s like to study {course.title.toLowerCase()} through hands-on lessons and real-world applications.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{mockStats.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{mockStats.duration}h</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{mockStats.students}</span>
            </div>
          </div>
        </div>
        
        <Link href={`/courses/${course.slug}`} className="block">
          <Button 
            className="w-full" 
            variant="default"
            data-testid={`course-${course.slug}-button`}
          >
            Explore This Major
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}