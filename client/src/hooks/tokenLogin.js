import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/user";

export default () => {
	const navigate = useNavigate();

	const user = useContext(UserContext);

	// Retrieve the access token from LocalStorage
	// One time
	useEffect(() => {
		const token = localStorage.getItem("access_token");

		if (!token) {
			// No token in local storage
			navigate("/");
			console.log("No token in local storage");
		} else {
			// Token found in his localStorage
			fetch("http://localhost:4000/auth/token", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((resp) => {
					if (resp.status !== 200) {
						toast.error("Couldn't login using access token");
					} else {
						return resp.json();
					}
				})
				.then((data) => {
					// data: {message: "", data: {id: "", email:""}}
					if (data) {
						toast.success(data.message);
						user.setUser({ isConnected: true, data: data.data }); // Change his context status
						navigate("/home");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);
};
