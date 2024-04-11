import React from "react";

import { Modal } from "@/app/component/Modal/Modal";
import Box from "@mui/material/Box/Box";
import Link from "@mui/material/Link/Link";
import Button from "@mui/material/Button/Button";

import IconButton from "@mui/material/IconButton/IconButton";
import { CloseRounded } from "@mui/icons-material";

import { ModalHeaderSection } from "../header";
import { ModalMainContent } from "../content";
import { Data, MSDetail } from "../../../type";
import { PDFViewer } from "@react-pdf/renderer";
import Typography from "@mui/material/Typography/Typography";
import { montserrat } from "@/utils/fonts";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import Grid from "@mui/material/Grid/Grid";
import { PDFTemplate } from "@/app/component/PDFTemplate";
import Loader from "@/components/Loader";

export function ModalLink(props: { isInProcess?: boolean; data: Data}) {
    const [details, setDetails] = React.useState<MSDetail | undefined>(undefined);
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
        await fetch(`/api/message/detail?id=${props.data.id}`).then(res => res.json()).then(res => {
            setDetails(res[0])
            setIsLoading(false);
        });
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
                {props.data.OSN || props.data.TSN || null}
            </Link>
            <Modal sx={{color: 'black',p: "40px",maxWidth: "960px"}} open={isOpen} onClose={handleClose}>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: "10px", top: "10px" }}
                >
                    <CloseRounded />
                </IconButton>
                {!!details ? (
                    isLoading ?  
                        <Loader label="Cargando Detalle..."/>
                    :  pdfView ? (
                    <>
                        <Typography variant="h6" fontWeight={700} fontFamily={montserrat.style.fontFamily} mb={3}fontSize={16}>
                            Previsualización de impresión
                        </Typography>
                        <PDFViewer width="100%" height='450px'>
                            <PDFTemplate data={details}/>
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
                            <ModalHeaderSection data={details} />
                        </Box> 
                        <Box>
                            <ModalMainContent data={details} />
                        </Box>
                        <Box display={'flex'} justifyContent={'flex-end'} mt={3}>
                            <Button variant="outlined" size='large' onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Box>
                    </>
                    )
                ) : 
                (
                    <Loader label="Cargando Detalle..."/>
                )
            }
            </Modal>
        </>
    )

};
