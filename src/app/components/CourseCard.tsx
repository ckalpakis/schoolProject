import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, BookOpen, Play, Star } from 'lucide-react'

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
             course.title.includes('Psychology') ? 'Social Science' : 'General',
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5-5.0 rating
    emoji: course.title.includes('Computer') ? '💻' : 
           course.title.includes('Business') ? '💼' : 
           course.title.includes('Psychology') ? '🧠' : '📚'
  }

  const colors = [
    { bg: 'bg-white/95 backdrop-blur-sm', border: 'border-white/40', text: 'text-blue-600', button: 'bg-blue-500 hover:bg-blue-600' },
    { bg: 'bg-white/95 backdrop-blur-sm', border: 'border-white/40', text: 'text-purple-600', button: 'bg-purple-500 hover:bg-purple-600' },
    { bg: 'bg-white/95 backdrop-blur-sm', border: 'border-white/40', text: 'text-indigo-600', button: 'bg-indigo-500 hover:bg-indigo-600' },
    { bg: 'bg-white/95 backdrop-blur-sm', border: 'border-white/40', text: 'text-violet-600', button: 'bg-violet-500 hover:bg-violet-600' },
    { bg: 'bg-white/95 backdrop-blur-sm', border: 'border-white/40', text: 'text-blue-700', button: 'bg-blue-600 hover:bg-blue-700' }
  ]
  
  const colorScheme = colors[Math.floor(Math.random() * colors.length)]

  return (
    <Card className={`group hover:shadow-2xl transition-all duration-300 border-4 ${colorScheme.bg} ${colorScheme.border} shadow-lg hover:scale-105 transform ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">{mockStats.emoji}</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-700">{mockStats.rating}</span>
              </div>
            </div>
            <CardTitle className={`text-2xl font-black leading-tight mb-3 ${colorScheme.text}`}>
              {course.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-blue-400 text-white text-xs px-3 py-1 rounded-full font-bold border-0">
                {mockStats.category}
              </Badge>
              <Badge className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full font-bold border-2 border-gray-300">
                {mockStats.level}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-gray-600 text-base font-medium">
          Jump into the exciting world of {course.title.toLowerCase()}! Learn through fun challenges and real projects! 🚀
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-medium">
              <BookOpen className="h-4 w-4" />
              <span>{mockStats.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <Clock className="h-4 w-4" />
              <span>{mockStats.duration}h fun</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <Users className="h-4 w-4" />
              <span>{mockStats.students}+ students</span>
            </div>
          </div>
        </div>
        
        <Link href={`/courses/${course.slug}`} className="block">
          <Button 
            className={`w-full text-white text-lg py-6 rounded-full font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${colorScheme.button}`}
            data-testid={`course-${course.slug}-button`}
          >
            <Play className="mr-2 h-5 w-5" />
            Start Adventure!
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}