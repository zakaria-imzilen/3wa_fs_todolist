import { useEffect, useState } from "react";
import "./App.css";
import { routes } from "./utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/user";

function App() {
	const [user, setUser] = useState({ isConnected: false, data: null });

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<Routes>
					{routes.map((route) => (
						<Route
							key={route.id}
							path={route.path}
							Component={route.component}
						/>
					))}
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
