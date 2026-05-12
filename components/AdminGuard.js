"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we are on the login page
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    // Simple mock auth check (in a real app, this would check tokens/session)
    const authStatus = localStorage.getItem('isAdminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Caricamento...</div>;
  }

  // If on login page, just render it (it doesn't need to be authenticated)
  if (pathname === '/admin/login') {
    return children;
  }

  return isAuthenticated ? children : null;
}
