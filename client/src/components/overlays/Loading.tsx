import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <Box sx={{ transform: "translate(-50%, -50%)" }} left={"50%"} top={"50%"}>
            <CircularProgress color="success" />
        </Box>
    )
}

export default Loading