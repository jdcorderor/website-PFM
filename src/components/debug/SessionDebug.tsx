import { useSession } from '../auth/AuthGuard';

export default function SessionDebug() {
  const { session, isAuthenticated, userRole, studentId } = useSession();

  if (typeof window === 'undefined') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-xs">
      <h3 className="font-bold mb-2">Debug - Sesión</h3>
      <div>
        <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}</p>
        <p><strong>Rol:</strong> {userRole || 'N/A'}</p>
        <p><strong>Student ID:</strong> {studentId || 'N/A'}</p>
        <p><strong>Token:</strong> {session?.token ? `${session.token.substring(0, 20)}...` : 'N/A'}</p>
      </div>
    </div>
  );
}
