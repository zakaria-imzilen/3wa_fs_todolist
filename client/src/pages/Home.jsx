import React, { useContext, useEffect } from "react";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import useTokenLogin from "../hooks/tokenLogin";

const Home = () => {
	const navigate = useNavigate();

	// Retrieve context value using useContext
	const userData = useContext(UserContext);

	useTokenLogin();

	useEffect(() => {
		if (!localStorage.getItem("access_token")) {
			if (!userData.user.isConnected) return navigate("/");
		}
	}, []);

	return !userData.user.isConnected ? "Loading..." : <div>Home</div>;
};

export default Home;
