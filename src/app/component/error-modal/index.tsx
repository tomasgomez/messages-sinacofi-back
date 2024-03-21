import React from "react";
import { Modal, ModalContent, ModalFooter, ModalProps } from "../Modal";
import { Box, Button, Stack, Typography } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export type ErrorModalTypes=
ModalProps &
{
    title:string;
    message:string;
    onCancel:()=> void;
    onRetry:()=>void;
}

export function ErrorModal(props:ErrorModalTypes){
    return(
        <Modal maxWidth="500px" open={props.open}>
            <Stack direction={'column'} justifyContent={'center'} color={'black'} textAlign={'center'}>
                <Typography color={'red'} fontSize={'56px'}>
                    <WarningAmberIcon fontSize="inherit"/>
                </Typography>
                <Typography fontWeight={700} fontSize={'18px'}>
                    {props.title}
                </Typography>
                <Typography fontSize={'14px'}>
                    {props.message}
                </Typography>
            </Stack>
            <ModalFooter placeContent="center">
                <Button onClick={props.onCancel} variant="outlined" sx={{paddingX:2, paddingY:1, borderRadius:3}}>Cancelar</Button>
                <Button onClick={props.onRetry} variant="contained" sx={{color:'white', paddingX:2, paddingY:1, borderRadius:3}}>Volver a intentar</Button>
            </ModalFooter>
        </Modal>
    )
}

