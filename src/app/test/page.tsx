'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TestResult {
  success: boolean
  message: string
  tables?: {
    courses: { count: number; sample: any }
    lessons: { count: number; sample: any }
    progress: { count: number; sample: any }
  }
  supabase_url?: string
  timestamp?: string
  error?: string
  details?: string
}

export default function TestPage() {
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to connect to API',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Test</h1>
          <p className="text-muted-foreground mt-2">
            Test the complete setup: Next.js, Supabase connection, and database schema
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Database Connection Test</CardTitle>
            <CardDescription>
              This will test the connection to your local Supabase instance and verify the database schema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testDatabase} 
              disabled={loading}
              className="mb-4"
            >
              {loading ? 'Testing...' : 'Test Database Connection'}
            </Button>

            {result && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={result.success ? 'default' : 'destructive'}>
                    {result.success ? 'Success' : 'Failed'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {result.timestamp}
                  </span>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">{result.message}</p>
                  {result.error && (
                    <p className="text-destructive mt-2">Error: {result.error}</p>
                  )}
                  {result.details && (
                    <p className="text-muted-foreground mt-2">Details: {result.details}</p>
                  )}
                </div>

                {result.success && result.tables && (
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Courses Table</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{result.tables.courses.count}</p>
                        <p className="text-xs text-muted-foreground">records found</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Lessons Table</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{result.tables.lessons.count}</p>
                        <p className="text-xs text-muted-foreground">records found</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Progress Table</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{result.tables.progress.count}</p>
                        <p className="text-xs text-muted-foreground">records found</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {result.supabase_url && (
                  <div className="text-sm text-muted-foreground">
                    <p>Connected to: {result.supabase_url}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="default">✓</Badge>
                <span>Next.js 15 with TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">✓</Badge>
                <span>Tailwind CSS + shadcn/ui</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">✓</Badge>
                <span>Supabase CLI installed</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">✓</Badge>
                <span>Local Supabase stack running</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">✓</Badge>
                <span>Database schema migrated</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">✓</Badge>
                <span>Environment variables configured</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}