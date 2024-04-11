// eslint-disable-next-line no-unused-vars
import { Navigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProtectRoute({ children }) {
  const isLoggedIn = localStorage.getItem("local_storage_user_data");
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
}

export default ProtectRoute;
