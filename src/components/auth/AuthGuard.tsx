import { useEffect, useState } from 'react';
import { sessionManager, setupSessionMonitoring } from '../../lib/session';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean>(true);

  useEffect(() => {
    // Set up session monitoring
    setupSessionMonitoring();

    // Check authentication status
    const checkAuth = () => {
      const authenticated = sessionManager.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated && requiredRole) {
        const userRole = sessionManager.getUserRole();
        setHasRequiredRole(userRole === requiredRole);
      }
    };

    checkAuth();

    // Set up periodic auth check (every 30 seconds)
    const interval = setInterval(checkAuth, 30000);

    return () => clearInterval(interval);
  }, [requiredRole]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col w-full h-120 md:h-150 items-center justify-center">
        <p className="text-lg font-montserrat text-gray-700 font-bold">Verificando sesión...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
    return (
      <div className="flex flex-col w-full h-120 md:h-150 items-center justify-center">
        <p className="text-lg font-montserrat text-gray-700 font-bold">Redirigiendo al login...</p>
      </div>
    );
  }

  // Redirect if doesn't have required role
  if (requiredRole && !hasRequiredRole) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return (
      <div className="flex flex-col w-full h-120 md:h-150 items-center justify-center">
        <p className="text-lg font-montserrat text-red-500 font-bold">
          No tienes permisos para acceder a esta página.
        </p>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
}

// Hook to get current session data
export function useSession() {
  const [session, setSession] = useState(sessionManager.getSession());

  useEffect(() => {
    const checkSession = () => {
      setSession(sessionManager.getSession());
    };

    // Check session every 5 seconds
    const interval = setInterval(checkSession, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    session,
    isAuthenticated: sessionManager.isAuthenticated(),
    userRole: sessionManager.getUserRole(),
    studentId: sessionManager.getStudentId(),
    logout: () => {
      sessionManager.clearSession();
      window.location.href = '/login';
    }
  };
}
