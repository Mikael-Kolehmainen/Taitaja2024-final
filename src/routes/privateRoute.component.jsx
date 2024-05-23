import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { valdiateSession } from "../backend/user";

/*
  This is a private route. This component is used for other components that should
  be locked behind authentication. When we want to define a route as private, we
  do it in the App.jsx and define our route by calling this component and passsing
  the component that we want to show on the page. Once the user lands on the url,
  the code path will go through this component and check if the authentication is
  active.
*/

const PrivateRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const validateUserSession = async () => {
      setIsFetching(true);
      try {
        const session = {
          username: user.username,
          session: user.session,
        };
        const response = await valdiateSession(session);
        if (response.status == 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
      setIsFetching(false);
    };

    validateUserSession();
  }, []);

  if (isFetching) {
    return <></>;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
