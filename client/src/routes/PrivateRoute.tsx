import React, { useContext, useEffect } from "react";
import UserContext from "../context/user";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/overlays/Loading";
import { loginToken } from "../api";
import { toast } from "react-toastify";

// 🚨
const PrivateRoute = () => {
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();

	const isConnected = userCtx?.user.isConnected;
	const setUser = userCtx?.setUser;

	// He's not connected ?
	// Give him a chance (Using his Cookie tokens)
	// Bad ? Back to Login
	useEffect(() => {
		if (!isConnected) {

			loginToken().then((resp) => {
				console.log("Response", resp);
				if (!resp.status) {
					navigate("/login");
					toast.warn("Session expired, please login again");
					return;
				}
				if (setUser) {
					// I let know my React Components that the user is connected succesfully
					// and its data is the following:
					// resp.data
					setUser({ isConnected: true, data: resp?.data ?? null });
				}
			});
		}
	}, []); // I keep it empty so if the User logged out -> Won't force him to LOGIN AGAIN

	if (isConnected) return <Outlet />;
	return <Loading />;
};

export default PrivateRoute;
