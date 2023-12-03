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
	Divider,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import PrjContent from "../components/PrjContent";
import { PrjObj, ProjectCntxtType } from "../interfaces";
import { useNavigate } from "react-router-dom";

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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginRight: -drawerWidth,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	}),
	/**
	 * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
	 * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
	 * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
	 * proper interaction with the underlying content.
	 */
	position: 'relative',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-start',
}));

const Home = () => {
	// Retrieve context value using useContext
	const userContext = useContext(UserContext);
	const [projects, setProjects] = useState([]);
	const [selectedPrj, setSelectedPrj] = useState<{
		id: null | string;
		data: null | PrjObj;
	}>({ id: null, data: null });

	const navigate = useNavigate();

	useTokenLogin();

	useEffect(() => {
		if (userContext?.user?.isConnected) {
			fetchProjects()
				.then((resp) => {
					if (resp.status == 401) {
						userContext.setUser({ isConnected: false, data: null })
						localStorage.clear();
						return navigate("/");
					}

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
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" open={open}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerOpen}
							sx={{ ...(open && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography marginLeft={2} variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
							Project Management Tool
						</Typography>
					</Toolbar>
				</AppBar>
				<Box width={"100%"} padding={5}>
					<DrawerHeader />
					<PrjContent />
				</Box>

				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
						},
					}}
					variant="temporary"
					anchor="left"
					open={open}
					onClose={() => setOpen(false)}
				>
					<DrawerHeader>
						<IconButton onClick={() => setOpen(false)} />
					</DrawerHeader>

					<Divider />
					<PrjAside open={open} setOpen={setOpen} />
				</Drawer>
			</Box>
		</ProjectContext.Provider>
	);
};

export default Home;
