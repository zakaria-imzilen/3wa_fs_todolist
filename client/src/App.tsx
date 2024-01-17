import React, { useCallback } from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import { privateRoutes, publicRoutes } from "./routes";
import { UserObj } from "./interfaces";
import PrivateRoute from "./routes/PrivateRoute";
import AlertContext from "./context/alert";
import { Snackbar } from "@mui/material";
import Loading from "./components/overlays/Loading";
import LoadingContext from "./context/loading"

function App() {
	const [user, setUser] = useState<{
		isConnected: boolean;
		data: UserObj | null;
	}>({ isConnected: false, data: null });
	const [open, setOpen] = useState<{ status: boolean; message: string }>({
		status: false,
		message: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleCloseSnackbar = useCallback(
		() => setOpen({ status: false, message: "" }),
		[open]
	);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Loading open={isLoading} />
			<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
				<AlertContext.Provider value={{ open, setOpen }}>
					<BrowserRouter>
						<Routes>
							<Route element={<PrivateRoute />}>
								{privateRoutes.map((route) => (
									<Route
										key={route.id}
										path={route.path}
										Component={route.component}
									/>
								))}
							</Route>

							{publicRoutes.map((route) => (
								<Route
									key={route.id}
									path={route.path}
									Component={route.Component}
								>
									{route.children?.map((childRoute) => (
										<Route
											key={childRoute.id}
											path={childRoute.path}
											Component={childRoute.Component}
										/>
									))}
								</Route>
							))}
						</Routes>
					</BrowserRouter>
				</AlertContext.Provider>
			</LoadingContext.Provider>

			<Snackbar
				open={open.status}
				autoHideDuration={1000}
				onClose={handleCloseSnackbar}
				message={open.message}
			/>
		</UserContext.Provider>
	);
}

export default App;
