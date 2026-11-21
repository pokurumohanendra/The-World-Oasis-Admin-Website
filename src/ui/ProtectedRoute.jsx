import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(() => { if (!isLoading && !isAuthenticated) navigate("/login", { replace: true }); }, [isLoading, isAuthenticated, navigate]);
  if (isLoading) return <Spinner />;
  if (isAuthenticated) return children;
  return null;
}
export default ProtectedRoute;
