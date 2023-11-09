import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import UserContext from "../context/user";
import useTokenLogin from "../hooks/tokenLogin";
import { toast } from "react-toastify";
import ProjectContext from "../context/project";
import PrjAside from "../components/PrjAside";
import { fetchProjects } from "../api";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import {
	Box,
	CssBaseline,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import PrjContent from "../components/PrjContent";
import { PrjObj, ProjectCntxtType } from "../interfaces";

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Home = () => {
	// Retrieve context value using useContext
	const userContext = useContext(UserContext);
	const [projects, setProjects] = useState([]);
	const [selectedPrj, setSelectedPrj] = useState<{
		id: null | string;
		data: null | PrjObj;
	}>({ id: null, data: null });

	useTokenLogin();

	useEffect(() => {
		const { signal, abort } = new AbortController();

		if (userContext?.user?.isConnected) {
			console.log(userContext.user);
			const token =
				userContext?.user?.data?.token ?? localStorage.getItem("access_token");

			if (token) {
				console.log("Token", token)
				fetchProjects({ access_token: token, signal })
					.then((resp) => {
						console.log(resp);

						if (resp.status == false) {
							toast.error("Couldn't fetch the projects");
						} else {
							setProjects(resp.data);
							toast.success(resp?.message);
						}
					})
					.catch((err) => {
						toast.error("Couldn't fetch the projects");
						console.error(err);
					});
			}
		}

		// return () => abort("Component unloaded");
	}, [userContext?.user?.isConnected]);

	const [open, setOpen] = useState(true);

	const handleDrawerOpen = useCallback(() => {
		setOpen(true);
	}, []);

	return !userContext?.user?.isConnected ? (
		"Loading..."
	) : (
		<ProjectContext.Provider
			value={{ projects, setProjects, selectedPrj, setSelectedPrj }}
		>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				{/* <AppBar
					position="fixed"
					sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
				>
					<Toolbar>
						<Typography variant="h6" noWrap component="div">
							Project Management Tool
						</Typography>
					</Toolbar>
				</AppBar> */}
				<PrjAside open={open} setOpen={setOpen} />
				<PrjContent />
			</Box>
		</ProjectContext.Provider>
	);
};

export default Home;
