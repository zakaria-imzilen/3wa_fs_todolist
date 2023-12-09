import { Typography } from '@mui/material'
import React, { memo } from 'react'
import { TodoObj } from '../../../interfaces'

interface ContentImp {
    todo: TodoObj
}

const Content = ({ todo }: ContentImp): React.JSX.Element =>
    <Typography variant="body1" color="HighlightText">
        {todo.label[0].toUpperCase() + todo.label.slice(1)}</Typography>

export default memo(Content)