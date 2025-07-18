'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { LogOut, User as UserIcon } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function AuthButton() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="bg-purple-100 rounded-full px-6 py-2 animate-pulse">
        <div className="w-16 h-4 bg-purple-200 rounded"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 font-medium">
          <UserIcon className="h-4 w-4" />
          <span className="text-sm">
            {user.user_metadata?.name || user.email?.split('@')[0]}
          </span>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="bg-white/90 hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link href="/auth">
      <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
        Sign In
      </Button>
    </Link>
  );
}