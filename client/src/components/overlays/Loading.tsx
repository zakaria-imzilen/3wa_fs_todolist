import { Box, CircularProgress, Container, Fade } from "@mui/material";

interface LoadingInt {
    open: boolean;
}

const Loading = ({ open }: LoadingInt) => {
    return open ? (
        <Container
            maxWidth={false}
            sx={{
                position: "absolute",
                zIndex: 2000,
                width: "100vw",
                height: "100vh",
                inset: 0,
                background: "rgba(0, 0, 0, .6)",
            }}
        >
            <Box
                sx={{
                    height: 40,
                    position: "absolute",
                    zIndex: 2000,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >

                <CircularProgress color="info" disableShrink />

            </Box>
        </Container>
    ) : (
        ""
    );
};

export default Loading;
