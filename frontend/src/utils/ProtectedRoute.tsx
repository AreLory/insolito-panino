import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/shared/Loader";

interface Props {
  userRole?: string;
}

export default function ProtectedRoute({ userRole }: Props) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) return <Loader/>

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (userRole && role !== userRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
