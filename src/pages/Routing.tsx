import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./Home";
import Signin from "./Signin";
import { useAuth } from "../app/hooks/useAuth";

const Routing = () => {
  const { isAuthenticated, user } = useAuth();

  const getRouteByRole = (role: string) => {
    return (
      <>
        <Route index element={<Home />} />
      </>
    );
  };

  return (
    <Routes>
      {getRouteByRole("")}
      {/* {isAuthenticated && user ? (
        routeByRole("")
      ) : (
        <Route path="/signin" element={<Signin />} />
      )} */}
    </Routes>
  );
};

export default Routing;
