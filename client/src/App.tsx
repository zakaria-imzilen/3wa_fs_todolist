import React, { useCallback } from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import UserContext from "./context/user";
import { privateRoutes, publicRoutes } from "./routes";
import { UserObj } from "./interfaces";
import PrivateRoute from "./routes/PrivateRoute";
import AlertContext from "./context/alert";
import { Snackbar } from "@mui/material";
// import { Snackbar } from "@mui/material";

function App() {
	const [user, setUser] = useState<{
		isConnected: boolean;
		data: UserObj | null;
	}>({ isConnected: false, data: null });
	const [open, setOpen] = useState<{ status: boolean; message: string }>({
		status: false,
		message: "",
	});

	const handleCloseSnackbar = useCallback(
		() => setOpen({ status: false, message: "" }),
		[open]
	);

	return (
		<UserContext.Provider value={{ user, setUser }}>
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
								{route.children.map((childRoute) => (
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

			<Snackbar
				open={open.status}
				autoHideDuration={500}
				onClose={handleCloseSnackbar}
				message={open.message}
			/>
		</UserContext.Provider>
	);
}

export default App;
