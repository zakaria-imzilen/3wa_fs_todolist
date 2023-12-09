import { Box, Button } from '@mui/material'
import React from 'react'
import { ActionsSignature } from '../../../interfaces/newTodo'

const Actions: ActionsSignature = ({ onCreateNewTodo }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Button sx={{ display: "block", marginLeft: "auto", color: "white" }} size='small' variant="text" onClick={onCreateNewTodo}>
                Save
            </Button>
        </Box>
    )
}

export default Actions