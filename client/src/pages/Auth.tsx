import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import "../assets/css/Auth.css";
import UserContext from "../context/user";

const Auth = () => {
	const user = useContext(UserContext);

	return user?.user.isConnected ? <Navigate to={"/home"} /> : <Outlet />;
};

export default Auth;
