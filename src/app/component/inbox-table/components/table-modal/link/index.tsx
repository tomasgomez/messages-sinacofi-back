import React from "react";

import { Modal } from "@/app/component/Modal/Modal";
import Box from "@mui/material/Box/Box";
import Link from "@mui/material/Link/Link";
import Button from "@mui/material/Button/Button";

import IconButton from "@mui/material/IconButton/IconButton";
import { CloseRounded } from "@mui/icons-material";

import { ModalHeaderSection } from "../header";
import { ModalMainContent } from "../content";
import { MSDetail } from "../../../type";
import { mockMS199 } from "@/app/messages/inbox/mock-ms-199";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export function ModalLink(props: { isInProcess?: boolean; }) {
    const [data, setData] = React.useState<MSDetail>(mockMS199);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const handleClose = () => {
        setIsOpen(false)
    };
 

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/message/detail?id=1234');
        if (!response.ok) {
          setIsLoading(true);
          throw new Error("Error al solicitar detalle del mensajes");
        }
        setData(mockMS199);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al solicitar detalle del mensajes", error);
        setIsLoading(false);
      }
    };

    const handleOpen = () => {
        setIsOpen(true);
        setIsLoading(true);
        setTimeout(() =>{
            fetchData();
        },1000)
    };

    return (
        <>
            <Link
                component="button"
                variant="body2"
                onClick={handleOpen}
                style={{ color: "#00B2E2" }}
            >
                {data.OSN || data.TSN || null}
            </Link>
            <Modal sx={{color: 'black',p: "40px",maxWidth: "960px"}} open={isOpen} onClose={handleClose}>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: "10px", top: "10px" }}
                >
                    <CloseRounded />
                </IconButton>
                {isLoading ?  
                    <Box display='flex' justifyContent='center' py={15}>
                        <CircularProgress size={45} thickness={2} />
                    </Box>
                : (
                    <>
                        <Box>
                            <ModalHeaderSection data={data} />
                        </Box>
                        <Box>
                            <ModalMainContent data={data} />
                        </Box>
                        <Box display={'flex'} justifyContent={'flex-end'} mt={3}>
                            <Button variant="outlined" size='large' onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Box>
                    </>
                )}
            </Modal>
        </>
    )

};
