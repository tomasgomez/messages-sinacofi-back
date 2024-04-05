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
import { PDFViewer } from "@react-pdf/renderer";
import Typography from "@mui/material/Typography/Typography";
import { montserrat } from "@/utils/fonts";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import Grid from "@mui/material/Grid/Grid";
import { PDFTemplate } from "@/app/component/PDFTemplate";

export function ModalLink(props: { isInProcess?: boolean; }) {
    const [data, setData] = React.useState<MSDetail>(mockMS199);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [pdfView, setPdfView] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const handleClose = () => {
        setIsOpen(false);
        setPdfView(false);
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

    const handlePrint = () => {
        setPdfView(true);
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
                :  pdfView ? (
                    <>
                        <Typography variant="h6" fontWeight={700} fontFamily={montserrat.style.fontFamily} mb={3}fontSize={16}>
                            Previsualización de impresión
                        </Typography>
                        <PDFViewer width="100%" height='450px'>
                            <PDFTemplate data={data}/>
                        </PDFViewer>
                    </>
                ) : ( 
                    <> 
                        <Grid item xs={4} position="absolute" right={40}>
                            <Button onClick={handlePrint} variant="contained" sx={{ color: 'white', textTransform: 'none', fontFamily: montserrat.style.fontFamily }} size="large">
                                <PrintOutlinedIcon />
                                Imprimir
                            </Button>
                        </Grid>
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
