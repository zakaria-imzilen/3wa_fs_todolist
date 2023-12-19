import { Box, CircularProgress, Fade } from "@mui/material";
import React from "react";

interface LoadingInt {
    open: boolean;
}

const Loading = ({ open }: LoadingInt) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
                width: "100vw",
                height: "100vh",
            }}
        >
            <Box sx={{ height: 40, background: "white" }}>
                <Fade
                    in={open}
                    style={{
                        transitionDelay: open ? "800ms" : "0ms",
                        // position: "absolute",
                        // top: "50%",
                        // left: "50%",
                        // transform: "translate(-50%, -50%)",
                        // zIndex: 10,
                    }}
                    unmountOnExit
                >
                    <CircularProgress color="success" />
                </Fade>
            </Box>
        </Box>
    );
};

export default Loading;
