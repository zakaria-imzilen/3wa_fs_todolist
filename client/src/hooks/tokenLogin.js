import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/user";
import { axiosInstance, baseAPIUrl } from "../api";

export default () => {
	const navigate = useNavigate();

	const user = useContext(UserContext);

	// One time
	useEffect(() => {
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
								data: { ...data },
							}); // Change his context status
							navigate("/home");
						}
					}
				})
				.catch((err) => {
					// if (err.response.data.status == 401) {
					user.setUser({ isConnected: false, data: null });
					localStorage.clear();
					navigate("/");
					// }
					console.log(err);
				});
		}
	}, []);
};
