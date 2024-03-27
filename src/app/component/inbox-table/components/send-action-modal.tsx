import React from 'react'
import { Data } from '../type'
import { IconButton } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

export function SendActionModal(props:{row:Data}){
    return(
        <IconButton
        key={`expand-icon-${props.row.id}`}
        aria-label="expand row"
        style={{ padding: 0 }}
      >
        <SendOutlinedIcon/>
      </IconButton>
    )
}