// app/(authenticated)/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import {
  Home,
  Search,
  Users,
  Calendar,
  FileText,
  Settings,
  Menu,
  X,
  ChevronLeft,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Briefcase,
  MessageSquare,
  Bot,
  DollarSign,
  CreditCard,
  PlusCircle,
  Building2
} from 'lucide-react'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

interface UserProfile {
  id: string
  fullName: string
  email: string
  role: 'buyer' | 'professional'
  avatar?: string
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setUser(user)

        // Fetch user profile from your profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUserProfile({
            id: profile.id,
            fullName: profile.full_name || profile.fullName || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            role: profile.role || 'buyer',
            avatar: profile.avatar_url || profile.avatar
          })
        } else {
          // Fallback if no profile exists
          setUserProfile({
            id: user.id,
            fullName: user.email?.split('@')[0] || 'User',
            email: user.email || '',
            role: 'buyer'
          })
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navigation = userProfile?.role === 'professional' ? [
    { name: 'Dashboard', href: '/my-apulink', icon: Home },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Invoices', href: '/invoices', icon: DollarSign },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ] : [
    { name: 'Dashboard', href: '/my-apulink', icon: Home },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Find Professionals', href: '/professionals', icon: Search },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Budget', href: '/budget', icon: CreditCard },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/my-apulink" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Apulink
                </span>
              </Link>
            </div>
            
            {/* User info in sidebar */}
            <div className="mt-8 px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-emerald-600 flex items-center justify-center text-white font-semibold">
                    {userProfile?.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userProfile?.role}
                  </p>
                </div>
              </div>
            </div>

            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-50 to-emerald-50 text-purple-600 border-l-4 border-purple-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 h-5 w-5
                        ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Trullo AI Assistant */}
            <div className="px-4 py-4 border-t border-gray-200">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-emerald-50 rounded-lg hover:from-purple-100 hover:to-emerald-100 transition-colors">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Trullo Assistant</span>
                </div>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          {/* Mobile menu button */}
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              {/* Search can go here if needed */}
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-emerald-600 flex items-center justify-center text-white font-semibold">
                    {userProfile?.fullName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon className="mr-3 h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                      ${isActive
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}
