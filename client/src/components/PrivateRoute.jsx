import { useUserContext } from './userContext.ts';
import "../styles/PrivateRoute.css";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useUserContext();
  if (!isLoggedIn) {
    return  <div className="private-route-container">
              You must login with an account
            </div>;
  }
  
  return children;
  
};

export default PrivateRoute;
