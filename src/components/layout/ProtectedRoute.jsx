import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Usar rol.nombre si existe, sino rolNombre como fallback
  const userRole = user?.rol?.nombre || user?.rolNombre;

  console.log('🔐 ProtectedRoute:', { 
    isAuthenticated, 
    loading, 
    userRole,
    requiredRole,
    user 
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log('❌ Acceso denegado. Usuario rol:', userRole, 'Requerido:', requiredRole);
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;