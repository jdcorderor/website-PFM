// API Configuration for different environments
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:8000/api',
  },
  
  production: {
    baseUrl: 'https://no-recuerdo-el-dominio/api',
  }
};

// Get current environment
const getEnvironment = (): 'development' | 'production' => {
  if (typeof window === 'undefined') return 'development';
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else {
    return 'production';
  }
};

// Export the current API base URL
export const API_BASE_URL = API_CONFIG[getEnvironment()].baseUrl;
