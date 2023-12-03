import React, { useCallback, useContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "../assets/css/Auth.css";
import UserContext from "../context/user";
import useTokenLogin from "../hooks/tokenLogin";
import { toast } from "react-toastify";
import { axiosInstance, baseAPIUrl } from "../api";

const Auth = () => {
	const [emailIn, setEmailIn] = useState("");
	const [emailUp, setEmailUp] = useState("");
	const [pwdIn, setPwdIn] = useState("");
	const [pwdUp, setPwdUp] = useState("");
	const [nameUp, setNameUp] = useState("");

	const navigate = useNavigate();

	const user = useContext(UserContext);

	return user?.user.isConnected ? <Navigate to={"/home"} /> : <Outlet />
	// Retrieve the access token from LocalStorage
	// One time
	// useTokenLogin();

	// const handleSignIn = useCallback(
	// 	(e) => {
	// 		e.preventDefault();


	// 		axiosInstance.post(`/auth/signin`, {
	// 			email: emailIn,
	// 			pwd: pwdIn,
	// 			// _csrf: respConn._csrf
	// 		})
	// 			.then((resp) => {
	// 				const data = resp.data;

	// 				if (resp.status !== 200 && resp.status !== 201) {
	// 					toast.error(data.message);
	// 					console.log(data.message);
	// 				}
	// 				if (data?.access_token) {
	// 					// Storing the Access token in LocalStorage
	// 					// localStorage.setItem("access_token", data.access_token);
	// 					console.log(data.message);

	// 					// if (data.refreshToken)
	// 					// 	localStorage.setItem("refresh_token", data.refreshToken);

	// 					// Let know the components that the user is CONNECTED
	// 					user?.setUser({
	// 						isConnected: true,
	// 						data: {
	// 							...data.user,
	// 							token: data.access_token,
	// 						},
	// 					});
	// 					toast.success(data.message);

	// 					navigate("/home");
	// 				} else {
	// 					toast.error(data.message);
	// 					console.log(data.message);
	// 				}
	// 			})
	// 			.catch((err) => console.log(err));

	// 	},
	// 	[emailIn, pwdIn]
	// );

	// return (
	// 	<div className="container" id="container">
	// 		<div className="form-container sign-up-container">
	// 			<form action="#">
	// 				<h1>Create Account</h1>
	// 				<span>or use your email for registration</span>
	// 				<input
	// 					value={nameUp}
	// 					onChange={({ target }) => setNameUp(target.value)}
	// 					type="text"
	// 					placeholder="Name"
	// 				/>
	// 				<input
	// 					value={emailUp}
	// 					onChange={({ target }) => setEmailUp(target.value)}
	// 					type="email"
	// 					placeholder="Email"
	// 				/>
	// 				<input
	// 					value={pwdUp}
	// 					onChange={({ target }) => setPwdUp(target.value)}
	// 					type="password"
	// 					placeholder="Password"
	// 				/>
	// 				<button type="submit">Sign Up</button>
	// 			</form>
	// 		</div>
	// 		<div className="form-container sign-in-container">
	// 			<form onSubmit={handleSignIn} action="https://www.facebook.com">
	// 				<h1>Sign in</h1>
	// 				<span>or use your account</span>
	// 				<input
	// 					onChange={({ target }) => setEmailIn(target.value)}
	// 					value={emailIn}
	// 					type="email"
	// 					placeholder="Email"
	// 				/>
	// 				<input
	// 					onChange={({ target }) => setPwdIn(target.value)}
	// 					value={pwdIn}
	// 					type="password"
	// 					placeholder="Password"
	// 				/>
	// 				<a href="#">Forgot your password?</a>
	// 				<button type="submit">Sign In</button>
	// 			</form>
	// 		</div>
	// 		<div className="overlay-container">
	// 			<div className="overlay">
	// 				<div className="overlay-panel overlay-left">
	// 					<h1>Welcome Back!</h1>
	// 					<p>
	// 						To keep connected with us please login with your personal info
	// 					</p>
	// 					<button
	// 						onClick={() => {
	// 							const container = document.getElementById("container");

	// 							container?.classList.remove("right-panel-active");
	// 						}}
	// 						className="ghost"
	// 						id="signIn"
	// 					>
	// 						Sign In
	// 					</button>
	// 				</div>
	// 				<div className="overlay-panel overlay-right">
	// 					<h1>Hello, Friend!</h1>
	// 					<p>Enter your personal details and start journey with us</p>
	// 					<button
	// 						onClick={() => {
	// 							const container = document.getElementById("container");

	// 							container?.classList.add("right-panel-active");
	// 						}}
	// 						className="ghost"
	// 						id="signUp"
	// 					>
	// 						Sign Up
	// 					</button>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export default Auth;
