import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .limit(1)

    if (coursesError) {
      console.error('Courses query error:', coursesError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to query courses table',
        details: coursesError.message 
      }, { status: 500 })
    }

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .limit(1)

    if (lessonsError) {
      console.error('Lessons query error:', lessonsError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to query lessons table',
        details: lessonsError.message 
      }, { status: 500 })
    }

    const { data: progress, error: progressError } = await supabase
      .from('progress')
      .select('*')
      .limit(1)

    if (progressError) {
      console.error('Progress query error:', progressError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to query progress table',
        details: progressError.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      tables: {
        courses: { count: courses.length, sample: courses[0] || null },
        lessons: { count: lessons.length, sample: lessons[0] || null },
        progress: { count: progress.length, sample: progress[0] || null }
      },
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}