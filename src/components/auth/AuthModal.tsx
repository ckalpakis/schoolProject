'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'

interface AuthModalProps {
  children: React.ReactNode
}

export default function AuthModal({ children }: AuthModalProps) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name
            }
          }
        })
        if (error) throw error
        setSuccess('Check your email for verification link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        setSuccess('Welcome back!')
        setOpen(false)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setName('')
    setError('')
    setSuccess('')
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-black text-purple-600">
            {mode === 'signin' ? 'Welcome Back!' : 'Join the Adventure!'}
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-4 border-purple-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              {mode === 'signin' ? (
                <User className="h-8 w-8 text-white" />
              ) : (
                <Sparkles className="h-8 w-8 text-white" />
              )}
            </div>
            <CardTitle className="text-xl font-black text-purple-600">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {mode === 'signin' 
                ? 'Continue your learning journey!' 
                : 'Start exploring your perfect major today!'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm font-medium">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <Button
                variant="link"
                onClick={switchMode}
                className="text-purple-600 font-bold hover:text-purple-700"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}