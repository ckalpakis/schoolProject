'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/auth/AuthModal'
import { GraduationCap, User, LogOut, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const { user, signOut, loading } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
    }
    return user?.email?.split('@')[0] || 'User'
  }

  return (
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

            {loading ? (
              <div className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="hidden sm:inline font-medium">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <AuthModal>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Sign In
                </Button>
              </AuthModal>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}