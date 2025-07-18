import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          slug: string
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          slug: string
          title: string
          order_idx: number
          content_md: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          slug: string
          title: string
          order_idx: number
          content_md: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          slug?: string
          title?: string
          order_idx?: number
          content_md?: string
          created_at?: string
        }
      }
      progress: {
        Row: {
          user_id: string
          lesson_id: string
          completed_at: string
        }
        Insert: {
          user_id: string
          lesson_id: string
          completed_at?: string
        }
        Update: {
          user_id?: string
          lesson_id?: string
          completed_at?: string
        }
      }
    }
  }
}