import { API_BASE_URL } from '../config/api';
import { sessionManager } from './session';

// Types for API responses
export interface ApiResponse<T> {
  message: string;
  data?: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  student_id: number;
  user: any; // UserResource from Laravel
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface Estudiante {
  id: number;
  nombre: string;
  genero?: string;
  cedula?: string;
  fecha_nacimiento?: string;
  correo_electronico?: string;
  direccion?: string;
  telefono_estudiantes?: string;
  rif?: string;
  institucion_educacional?: string;
  ocupacion?: string;
  profesion?: string;
  lugar_trabajo?: string;
  alergico_a?: string;
  antecedentes?: string;
  especificacion_antecedentes?: string;
  nombre_emergencia?: string;
  numero_emergencia?: string;
  nombre_representante?: string;
  cedula_representante?: string;
  parentesco?: string;
  telefono_representante?: string;
  ocupacion_representante?: string;
  profesion_representante?: string;
  lugar_trabajo_representante?: string;
  direccion_representante?: string;
  rif_representante?: string;
  email_representante?: string;
  instrumentos?: string;
  teoricas?: string;
  otros?: string;
  autorizacion?: boolean;
  activo?: number;
  id_usuario?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Nota {
  nota_final: number;
  nivel_inicial: string;
  siguiente_nivel: string;
  materia: string;
  periodo: string;
  fecha_periodo: string;
  profesor: string;
}

export interface Catedra {
  id: number;
  nombre: string;
  tipo: string;
}

export interface AspiranteRequest {
  nombre: string;
  genero?: string;
  cedula?: string;
  fecha_nacimiento?: string;
  correo_electronico?: string;
  direccion?: string;
  telefono_estudiantes?: string;
  rif?: string;
  institucion_educacional?: string;
  ocupacion?: string;
  profesion?: string;
  lugar_trabajo?: string;
  alergico_a?: string;
  antecedentes?: string;
  especificacion_antecedentes?: string;
  nombre_emergencia?: string;
  numero_emergencia?: string;
  nombre_representante?: string;
  cedula_representante?: string;
  parentesco?: string;
  telefono_representante?: string;
  ocupacion_representante?: string;
  profesion_representante?: string;
  lugar_trabajo_representante?: string;
  direccion_representante?: string;
  rif_representante?: string;
  email_representante?: string;
  instrumentos?: string;
  teoricas?: string;
  otros?: string;
  autorizacion?: boolean;
}

// Utility function to get auth token - now uses session manager
const getAuthToken = (): string | null => {
  return sessionManager.getAuthToken();
};

// Utility function to set auth token - deprecated, use sessionManager.saveSession instead
const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Utility function to remove auth token - now uses session manager
const removeAuthToken = (): void => {
  sessionManager.clearSession();
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Authentication API calls
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>('/estudiante/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Save complete session data using sessionManager
    if (response.token && response.student_id && response.user) {
      sessionManager.saveSession({
        token: response.token,
        student_id: response.student_id,
        user: response.user
      });
    }
    
    return response;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await apiRequest<{ message: string }>('/estudiante/logout', {
      method: 'POST',
    });
    
    // Session will be cleared by the calling component (header)
    // to ensure proper cleanup
    return response;
  },

  createUser: async (userData: CreateUserRequest): Promise<any> => {
    return apiRequest('/estudiante/create-user', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getCurrentUser: async (): Promise<any> => {
    return apiRequest('/estudiante/user');
  },
};

// Student profile API calls
export const studentApi = {
  getProfile: async (studentId: number): Promise<{ message: string; data: Estudiante }> => {
    return apiRequest(`/perfil-estudiante/${studentId}`);
  },

  getGrades: async (studentId: number): Promise<{ message: string; data: Nota[] }> => {
    return apiRequest('/perfil-estudiante/notas', {
      method: 'POST',
      body: JSON.stringify({ id: studentId }),
    });
  },

  generatePlanilla: async (studentData: any): Promise<Blob> => {
    const url = `${API_BASE_URL}/perfil-estudiante/generar-planilla`;
    const token = getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  },
};

// Applicants API calls
export const aspiranteApi = {
  getByIds: async (ids: number[]): Promise<{ message: string; data: any[] }> => {
    return apiRequest('/aspirantes', {
      method: 'POST',
      body: JSON.stringify({ id: ids }),
    });
  },

  create: async (aspiranteData: AspiranteRequest): Promise<{ message: string; id: number }> => {
    return apiRequest('/aspirantes', {
      method: 'POST',
      body: JSON.stringify(aspiranteData),
    });
  },

  update: async (studentId: number, userId: number): Promise<{ message: string }> => {
    return apiRequest('/aspirantes', {
      method: 'PUT',
      body: JSON.stringify({ id: studentId, id_usuario: userId }),
    });
  },
};

// Students management API calls
export const estudianteApi = {
  getByIds: async (ids: number[]): Promise<{ message: string; data: Estudiante[] }> => {
    return apiRequest('/estudiantes', {
      method: 'POST',
      body: JSON.stringify({ id: ids }),
    });
  },

  create: async (estudianteData: Partial<Estudiante>): Promise<{ message: string; id: number }> => {
    return apiRequest('/estudiantes', {
      method: 'POST',
      body: JSON.stringify(estudianteData),
    });
  },

  update: async (studentId: number, estudianteData: { id_usuario: number }): Promise<{ message: string }> => {
    return apiRequest(`/estudiantes/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(estudianteData),
    });
  },
};

// Wait list interface matching your Laravel controller response
export interface ListaEsperaItem {
  id: number;
  nombre: string;
  fecha_nacimiento: string;
  genero: string;
  cedula: string;
  rif: string;
  telefono: string; // mapped from telefono_estudiantes
  institucion_educacional: string;
  ocupacion: string;
  profesion: string;
  lugar_trabajo: string;
  email: string; // mapped from correo_electronico
  direccion: string;
  alergico_a: string;
  antecedentes: string;
  especificacion_antecedentes: string;
  nombre_representante: string;
  cedula_representante: string;
  rif_representante: string;
  parentesco: string;
  telefono_representante: string;
  ocupacion_representante: string;
  profesion_representante: string;
  lugar_trabajo_representante: string;
  direccion_representante: string;
  email_representante: string;
  nombre_emergencia: string;
  numero_emergencia: string;
  instrumentos: string;
  teoricas: string;
  otros: string;
  autorizacion: string;
  estado: number;
}

// Wait list API calls
export const listaEsperaApi = {
  getAll: async (): Promise<{ message: string; data: ListaEsperaItem[] }> => {
    return apiRequest('/lista-espera');
  },

  create: async (id_estudiante: number): Promise<{ message: string }> => {
    return apiRequest('/lista-espera', {
      method: 'POST',
      body: JSON.stringify({ id_estudiante }),
    });
  },

  update: async (studentId: number, estado: number): Promise<{ message: string }> => {
    return apiRequest(`/lista-espera/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify({ estado }),
    });
  },
};

// Subjects API calls
export const catedraApi = {
  getAll: async (): Promise<{ message: string; data: Catedra[]; grupales: { nombre: string; id: number }[] }> => {
    return apiRequest('/catedras');
  },
};

// User creation API calls
export const userApi = {
  createUser: async (id_estudiante: number): Promise<{ message: string; id: number }> => {
    return apiRequest('/estudiante/user', {
      method: 'POST',
      body: JSON.stringify({ id_estudiante }),
    });
  },
};

// Migration API calls
export const migracionApi = {
  createUsers: async (userData: any): Promise<ApiResponse<any>> => {
    return apiRequest('/migracion/crear-usuarios', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// Utility functions
export const apiUtils = {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
};
