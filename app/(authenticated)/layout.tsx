// Path: app/(authenticated)/layout.tsx
// Layout for authenticated pages with navigation

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Briefcase,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: Array<'buyer' | 'professional' | 'admin'>;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/my-apulink',
    icon: Home,
    roles: ['buyer', 'professional', 'admin'],
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    roles: ['buyer', 'professional'],
  },
  {
    label: 'Documents',
    href: '/documents',
    icon: FileText,
    roles: ['buyer', 'professional'],
  },
  {
    label: 'Team',
    href: '/team',
    icon: Users,
    roles: ['buyer'],
  },
  {
    label: 'Clients',
    href: '/clients',
    icon: Briefcase,
    roles: ['professional'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['buyer', 'professional', 'admin'],
  },
];

function AuthenticatedLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, role, signOut, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !role) {
    return null;
  }

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Apulink</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`h-6 w-6 shrink-0 ${
                            isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                          }`} />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {/* User section at bottom */}
              <li className="mt-auto">
                <div className="border-t pt-4">
                  <div className="flex items-center gap-x-4 px-2 py-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.profile?.fullName || user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    <LogOut className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-blue-600" />
                    Sign out
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          {filteredNavItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
        </div>
        <button className="relative p-2">
          <Bell className="h-6 w-6 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="relative z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-900/80"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Apulink</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-gray-100">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center gap-x-3 rounded-md py-4 text-base leading-7 font-semibold ${
                          isActive ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${
                          isActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-72">
        {children}
      </main>
    </div>
  );
}

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthenticatedLayoutContent>{children}</AuthenticatedLayoutContent>
    </AuthProvider>
  );
}
