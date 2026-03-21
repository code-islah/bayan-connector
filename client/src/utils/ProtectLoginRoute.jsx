import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectLoginRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="h-screen w-full mt-15 flex justify-center items-center">
        <img className="w-15" src="/SVGs/spin.svg" alt="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectLoginRoute;
