import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // Note: Check your spelling (LoadingSpinner vs LoadingSpinner)

export default function AuthWrapper({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!currentUser) return <Navigate to="pages/Login" state={{ from: location }} replace />;

  return children;
}