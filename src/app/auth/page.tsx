'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { GraduationCap, Mail, Lock, User, ArrowLeft, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = '/';
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-bounce"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '1.5s' }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-blue-400 text-white text-sm px-4 py-2 rounded-full font-bold border-0 shadow-lg mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                JOIN THE ADVENTURE!
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-lg">
                {isSignUp ? 'Create Account' : 'Welcome Back!'}
              </h1>
              <p className="text-lg text-white/90 font-medium">
                {isSignUp
                  ? 'Join thousands of students discovering their passion!'
                  : 'Ready to continue your major exploration journey?'}
              </p>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm border-4 border-white/40 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-black text-center text-purple-600">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </CardTitle>
                <CardDescription className="text-center text-gray-600 font-medium">
                  {isSignUp
                    ? 'Create your account to get started'
                    : 'Enter your credentials to continue'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none font-medium"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none font-medium"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none font-medium"
                        placeholder="Enter your password"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {message && (
                    <div className={`text-sm text-center font-medium ${
                      message.includes('Check your email') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 font-medium">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-purple-600 hover:text-purple-700 font-black underline mt-1"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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