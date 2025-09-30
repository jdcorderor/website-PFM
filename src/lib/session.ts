// Session management utilities with cookies support
export interface UserSession {
  token: string;
  student_id: number;
  user: {
    id: number;
    username: string;
    role: {
      id: number;
      name: string;
      description?: string;
    };
    createdAt: string;
  };
}

// Cookie utilities
export const cookieUtils = {
  // Set cookie with expiration
  set: (name: string, value: string, days: number = 7): void => {
    if (typeof document === 'undefined') return;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure=${window.location.protocol === 'https:'}`;
  },

  // Get cookie value
  get: (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  // Remove cookie
  remove: (name: string): void => {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  }
};

// Session management functions
export const sessionManager = {
  // Save complete session data
  saveSession: (sessionData: UserSession): void => {
    try {
      // Save to cookies (more secure and persistent)
      cookieUtils.set('auth_token', sessionData.token);
      cookieUtils.set('student_id', sessionData.student_id.toString());
      cookieUtils.set('user_data', JSON.stringify(sessionData.user));
      
      // Also save to localStorage as fallback
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', sessionData.token);
        localStorage.setItem('student_id', sessionData.student_id.toString());
        localStorage.setItem('user_data', JSON.stringify(sessionData.user));
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  },

  // Get auth token
  getAuthToken: (): string | null => {
    // Try cookies first, then localStorage
    let token = cookieUtils.get('auth_token');
    
    if (!token && typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token');
    }
    
    return token;
  },

  // Get student ID
  getStudentId: (): number | null => {
    // Try cookies first, then localStorage
    let studentId = cookieUtils.get('student_id');
    
    if (!studentId && typeof window !== 'undefined') {
      studentId = localStorage.getItem('student_id');
    }
    
    return studentId ? parseInt(studentId, 10) : null;
  },

  // Get user data
  getUserData: (): any | null => {
    // Try cookies first, then localStorage
    let userData = cookieUtils.get('user_data');
    
    if (!userData && typeof window !== 'undefined') {
      userData = localStorage.getItem('user_data');
    }
    
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    
    return null;
  },

  // Get complete session
  getSession: (): UserSession | null => {
    const token = sessionManager.getAuthToken();
    const studentId = sessionManager.getStudentId();
    const user = sessionManager.getUserData();
    
    if (token && studentId && user) {
      return {
        token,
        student_id: studentId,
        user
      };
    }
    
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = sessionManager.getAuthToken();
    const studentId = sessionManager.getStudentId();
    return !!(token && studentId);
  },

  // Clear session
  clearSession: (): void => {
    // Remove from cookies
    cookieUtils.remove('auth_token');
    cookieUtils.remove('student_id');
    cookieUtils.remove('user_data');
    
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('student_id');
      localStorage.removeItem('user_data');
    }
  },

  // Get user role
  getUserRole: (): string | null => {
    const user = sessionManager.getUserData();
    return user?.role?.name || null;
  }
};

// Auto-logout on token expiration or invalid session
export const setupSessionMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Check session validity periodically
  const checkSession = () => {
    const token = sessionManager.getAuthToken();
    const studentId = sessionManager.getStudentId();
    
    // If we have a token but no student_id, something went wrong
    if (token && !studentId) {
      console.warn('Invalid session detected, clearing session');
      sessionManager.clearSession();
      window.location.href = '/login';
    }
  };

  // Check session on page load
  checkSession();

  // Check session every 5 minutes
  setInterval(checkSession, 5 * 60 * 1000);
};
