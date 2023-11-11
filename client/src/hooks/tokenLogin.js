import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/user";
import { axiosInstance, baseAPIUrl } from "../api";

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
			if (!user.user.isConnected) {
				// Token found in his localStorage
				axiosInstance
					.get("/auth")
					.then((resp) => {
						if (resp.status !== 200) {
							toast.error("Couldn't login using access token");
						} else {
							const data = resp.data;
							if (data) {
								console.log(data);
								toast.success(data.message);
								user.setUser({
									isConnected: true,
									data: { ...data, token },
								}); // Change his context status
								navigate("/home");
							}
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}, []);
};
