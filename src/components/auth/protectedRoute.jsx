import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Loader from "../common/loader";

/**
 * A component that protects routes from unauthorized access.
 * It checks if the user is authenticated and not loading.
 * If the user is authenticated, it renders the child components.
 * Otherwise, it redirects to the login page.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The components to render if authenticated.
 * @returns {React.ReactNode} The child components or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;