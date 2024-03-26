import React from "react";
import { Box, Button, Grid, IconButton, Link, Stack, Typography, styled } from "@mui/material";
import { Modal, ModalContent, ModalHeader } from "../../Modal";
import { Data } from "../type";
import { StyledModalItem, StyledMoalSection, StyledCapitalizedSpan } from "../../inbox-header/style";
import Image from "next/image";
import Signature from '../../../../../assets/signature.png'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";


export function InProcessModalHeaderSection(props: { row: Data; isInProcess?: boolean; isInbox?:boolean }) {
    return (
        <Box borderBottom={'dashed'} mb={2} pb={2}>
            <Grid container spacing={1} justifyContent={'space-around'} alignItems={'self-start'} >
                <Grid item xs={8}>
                    <StyledModalItem noWrap>
                        {`OSN-${props.isInbox? props.row.osn : props.row.tsn}`}
                    </StyledModalItem>
                    <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    fontFamily={montserrat.style.fontFamily} 
                    mb={3}
                    fontSize={16}>
                        {`${props.row.ms}`} <StyledCapitalizedSpan style={{ textTransform: 'capitalize' }}>{`${props.row.message.toLowerCase()}`}</StyledCapitalizedSpan>
                    </Typography>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'flex-end'} gap={1}>
                    <Button variant="contained" sx={{ color: 'white', textTransform: 'none', fontFamily: montserrat.style.fontFamily }} size="large">
                        <ReplyOutlinedIcon />
                        Responder
                    </Button>
                    <Button variant="contained" sx={{ color: 'white', textTransform: 'none', fontFamily: montserrat.style.fontFamily }} size="large">
                        <PrintOutlinedIcon />
                        Imprimir
                    </Button>
                </Grid>
            </Grid>
            <Stack spacing={2}>
                <Box>
                    <StyledMoalSection variant="h6">Detalles de envío</StyledMoalSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>OSN</Typography>
                            <StyledModalItem noWrap>
                                13010
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Institución Destino</Typography>
                            <StyledModalItem noWrap>
                                0027 CORP BANCA
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Fecha</Typography>
                            <StyledModalItem noWrap>
                                14/02/2024
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Hora</Typography>
                            <StyledModalItem noWrap>
                                11:00:00
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Prioridad</Typography>
                            <StyledModalItem noWrap>
                                02 Normal Sin Aviso de Entrega
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Autenticación</Typography>
                            <StyledModalItem noWrap>
                                No
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                    <Grid container width={'40%'} spacing={1} my={2}>
                        <Grid item xs={6}>
                            <Typography fontSize={'12px'}>Fecha Aceptación</Typography>
                            <StyledModalItem noWrap>
                                14/02/2024
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize={'12px'}>Requiere Liquidación de Pre Pago</Typography>
                            <StyledModalItem noWrap>
                                Sí
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={6}>
                            <Image src={Signature} width={100} height={50} alt='signature' />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize={'12px'}>Receptor</Typography>
                            <Typography noWrap fontSize={'14px'}>
                                Rafael Peñaloza Gutiérrez
                            </Typography>
                            <Typography noWrap fontSize={'14px'}>
                                RUT: 34.323.233-3
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} width={'66%'}>
                        <Grid item xs={4}>
                            <Box display={'flex'} alignItems={'center'} borderRadius={1} bgcolor={'#F8F8F8;'} p={1} justifyContent={'space-around'}>
                                <PictureAsPdfIcon fontSize={'small'} />
                                <Typography fontSize={14}>
                                    Pxxxxxx.doc
                                </Typography>
                                <Typography color={'gray'} fontSize={12}>
                                    3mb
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display={'flex'} alignItems={'center'} borderRadius={1} bgcolor={'#F8F8F8;'} p={1} justifyContent={'space-around'}>
                                <PictureAsPdfIcon fontSize={'small'} />
                                <Typography fontSize={14}>
                                    Pxxxxxx.doc
                                </Typography>
                                <Typography color={'gray'} fontSize={12}>
                                    3mb
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display={'flex'} alignItems={'center'} borderRadius={1} bgcolor={'#F8F8F8;'} p={1} justifyContent={'space-around'}>
                                <PictureAsPdfIcon fontSize={'small'} />
                                <Typography fontSize={14}>
                                    Pxxxxxx.doc
                                </Typography>
                                <Typography color={'gray'} fontSize={12}>
                                    3mb
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display={'flex'} alignItems={'center'} borderRadius={1} bgcolor={'#F8F8F8;'} p={1} justifyContent={'space-around'}>
                                <PictureAsPdfIcon fontSize={'small'} />
                                <Typography fontSize={14}>
                                    Pxxxxxx.doc
                                </Typography>
                                <Typography color={'gray'} fontSize={12}>
                                    3mb
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display={'flex'} alignItems={'center'} borderRadius={1} bgcolor={'#F8F8F8;'} p={1} justifyContent={'space-around'}>
                                <PictureAsPdfIcon fontSize={'small'} />
                                <Typography fontSize={14}>
                                    Pxxxxxx.doc
                                </Typography>
                                <Typography color={'gray'} fontSize={12}>
                                    3mb
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    )
}


export function ModalMainContent(props: { row: Data, isinProcess?: boolean; isInbox?:boolean; }) {
    return (
        <>
            <Grid container spacing={1} justifyContent={'space-around'} alignItems={'self-start'}>
                <Grid item xs={10}>
                    <StyledModalItem noWrap>
                        {`OSN-${props.isInbox ? props.row.osn :props.row.tsn}`}
                    </StyledModalItem>
                    <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    fontFamily={montserrat.style.fontFamily} 
                    mb={3}
                    fontSize={16}>
                        {`${props.row.ms}`} <StyledCapitalizedSpan style={{ textTransform: 'capitalize' }}>{`${props.row.message.toLowerCase()}`}</StyledCapitalizedSpan>
                    </Typography>
                </Grid>
                {!props.isinProcess &&
                    <Grid item xs={2} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant="contained" sx={{ color: 'white', textTransform: 'none', fontFamily: montserrat.style.fontFamily }} size="large">
                            <PrintOutlinedIcon />
                            Imprimir
                        </Button>

                    </Grid>
                }
            </Grid>
            <Stack spacing={3}>
                <StyledMoalSection variant="h6">Detalles de recepción</StyledMoalSection>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>OSN</Typography>
                            <StyledModalItem noWrap>
                                {props.isInbox? props.row.osn :props.row.tsn}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Institución Destino</Typography>
                            <StyledModalItem noWrap>
                                0001 Banco de Chile
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Fecha</Typography>
                            <StyledModalItem noWrap>
                                {props.row.date}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Hora</Typography>
                            <StyledModalItem noWrap>
                                {props.row.time}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Prioridad</Typography>
                            <StyledModalItem noWrap>
                                02 Normal Sin Aviso de Entrega
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Autenticación</Typography>
                            <StyledModalItem noWrap>
                                No
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Nombre del Responsable</Typography>
                            <StyledModalItem noWrap>
                                Juan Pérez
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Cargo del Responsable</Typography>
                            <StyledModalItem noWrap>
                                Ejecutivo de Cuentas
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Teléfono</Typography>
                            <StyledModalItem noWrap>
                                +56 9 45623821
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>No. de Referencia</Typography>
                            <StyledModalItem noWrap>
                                38DEAE3278173SDD
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Nombre de Institución</Typography>
                            <StyledModalItem noWrap>
                                0027 CORP BANCA
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Modalidad</Typography>
                            <StyledModalItem noWrap>
                                {'L (En Vivo)'}
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                </Box>
                <Typography fontSize={'12px'}>
                    LA INSTITUCION EMISORA DEL MENSAJE ASUME LA TOTAL RESPONSABILIDAD AF3:POR EL CONTENIDO DE ESTE, EL CUAL SERA CONSIDERADO, EN CASO DE APROBACION, COMO DOCUMENTO OFICIAL DE ESTA INSTITUCION; EL BANCO CENTRAL DE CHILE NO TENDRA NINGUN TIPO DE RESPONSABILIDAD RESPECTO DE DICHO CONTENIDO Y LA TRANSACCION QUEDARA SUJETA A SU APROBACION.
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography fontSize={'12px'}>BIC EMISOR</Typography>
                        <StyledModalItem noWrap>
                            CONBCLRM323
                        </StyledModalItem>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography fontSize={'12px'}>Institución Receptora</Typography>
                        <StyledModalItem noWrap>
                            0001 Banco de Chile
                        </StyledModalItem>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography fontSize={'12px'}>BIC Receptor</Typography>
                        <StyledModalItem noWrap>
                            BSCHCLRM432
                        </StyledModalItem>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography fontSize={'12px'}>Fecha de Emisión</Typography>
                        <StyledModalItem noWrap>
                            16 de enero de 2024
                        </StyledModalItem>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography fontSize={'12px'}>{'Tipo de Moneda (ISO 4217)'}</Typography>
                        <StyledModalItem noWrap>
                            Peso Chileno CLP
                        </StyledModalItem>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography fontSize={'12px'}>Monto de Operación</Typography>
                        <StyledModalItem noWrap>
                            $434,324.03
                        </StyledModalItem>
                    </Grid>
                </Grid>
                <Typography fontSize={'12px'}>Observaciones</Typography>
            </Stack>
        </>
    )
}



export function InProcessModalMainContent(props: { row: Data, isinProcess?: boolean; isInbox?:boolean;}) {
    return (
        <>
            <Box>
                <StyledModalItem noWrap>
                    {`OSN-${props.isInbox? props.row.osn :props.row.tsn}`}
                </StyledModalItem>
                <StyledMoalSection variant="h6">
                    {`${props.row.ms} - ${props.row.message}`}
                </StyledMoalSection>
            </Box>
            <Stack spacing={2}>
                <StyledMoalSection variant="h6">Detalles de recepción</StyledMoalSection>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>OSN</Typography>
                            <StyledModalItem noWrap>
                                {props.isInbox? props.row.osn :props.row.tsn}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Institución Destino</Typography>
                            <StyledModalItem noWrap>
                                0001 Banco de Chile
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Fecha</Typography>
                            <StyledModalItem noWrap>
                                {props.row.date}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Hora</Typography>
                            <StyledModalItem noWrap>
                                {props.row.time}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Prioridad</Typography>
                            <StyledModalItem noWrap>
                                02 Normal Sin Aviso de Entrega
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Autenticación</Typography>
                            <StyledModalItem noWrap>
                                No
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                    <Grid container spacing={2} my={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Fecha de Alzamiento</Typography>
                            <StyledModalItem noWrap>
                                03/01/2024
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Canal</Typography>
                            <StyledModalItem noWrap>
                                Personas
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Tipo de Operación</Typography>
                            <StyledModalItem noWrap>
                                Mutuo con Compraventa
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2.5}>
                            <Typography fontSize={'12px'}>Notaria Repertorio</Typography>
                            <StyledModalItem noWrap>
                                15001 - Conservador y Archivero de Arica
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={1.5}>
                            <Typography fontSize={'12px'}>Fecha Repertorio</Typography>
                            <StyledModalItem noWrap>
                                -
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={1.5}>
                            <Typography fontSize={'12px'}>Número Repertorio</Typography>
                            <StyledModalItem noWrap>
                                -
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                    <Grid container width={'90%'} spacing={2}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Institución</Typography>
                            <StyledModalItem noWrap>
                                Banco de Chile
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Vendedor</Typography>
                            <StyledModalItem noWrap>
                                Juan Perez Gonzalez
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>RUT de Vendedor</Typography>
                            <StyledModalItem noWrap>
                                98.765.432-1
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Comprador</Typography>
                            <StyledModalItem noWrap>
                                Carolina Lopez Ruiz
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={'12px'}>RUT de Comprador</Typography>
                            <StyledModalItem noWrap>
                                12.345.768-9
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Tipo de Inmueble</Typography>
                            <StyledModalItem noWrap>
                                Departamento
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography fontSize={'12px'}>Descripción del Inmueble</Typography>
                            <StyledModalItem noWrap>
                                Av. Providencia 456, 3 dormitorios, 2 baños, 80m²
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Comuna</Typography>
                            <StyledModalItem noWrap>
                                Providencia
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Región</Typography>
                            <StyledModalItem noWrap>
                                Metropolitana, Santiago
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Institución</Typography>
                            <StyledModalItem noWrap>
                                Banco Internacional
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={'12px'}>Acreedor</Typography>
                            <StyledModalItem noWrap>
                                Juan Perez Gonzalez
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Monto del mutuo</Typography>
                            <StyledModalItem noWrap>
                                3.259,59 UF
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>{"Plazo (Años)"}</Typography>
                            <StyledModalItem noWrap>
                                20
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={'12px'}>Monto del Mutuo Complementario</Typography>
                            <StyledModalItem noWrap>
                                540 UF
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Cargo Interno</Typography>
                            <StyledModalItem noWrap>
                                CRH 057 930480920
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Deudor</Typography>
                            <StyledModalItem noWrap>
                                Juan Perez Gonzalez
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>RUT del Deudor</Typography>
                            <StyledModalItem noWrap>
                                12.345.768-9
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={'12px'}>Monto UF</Typography>
                            <StyledModalItem noWrap>
                                3.799,59 UF
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                    <Typography fontSize={'12px'} my={2} width={'110%'}>
                        Con el objeto de cubrir eventuales diferencias que se puedan producir en las deudas que el(la) mencionado(a) señor(a) tiene con ustedes, les señalamos que el
                    </Typography>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Banco</Typography>
                            <StyledModalItem noWrap>
                                Banco Internacional
                            </StyledModalItem>
                        </Grid>
                        <Grid xs={3}>
                            <Typography fontSize={'12px'}>Mantiene en su poder la cantidad de</Typography>
                            <StyledModalItem noWrap>
                                $5.000.000 CLP
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container>
                    <Grid item xs={2}>
                        <Image src={Signature} width={120} height={60} alt='signature' />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={'12px'}>Apoderado/Enviador</Typography>
                        <Typography noWrap fontSize={'14px'}>
                            Rafael Peñaloza Gutiérrez
                        </Typography>
                        <Typography noWrap fontSize={'14px'}>
                            RUT: 34.323.233-3
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
}


export function ModalLink(props: { row: Data; isInProcess?: boolean; isInbox?:boolean }) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Link
                component="button"
                variant="body2"
                onClick={() => {
                    setIsOpen(true)
                }}
                style={{ color: "#00B2E2" }}
            >
                {props.isInbox? props.row.osn :props.row.tsn}
            </Link>
            <Modal sx={{
                color: 'black',
                p: "40px",
                maxWidth: "960px",
            }} open={isOpen} onClose={handleClose}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: "absolute", right: "10px", top: "10px" }}
                    >
                        <CloseRounded />
                    </IconButton>
                {props.isInProcess &&
                    <Box>
                        <InProcessModalHeaderSection isInbox={props.isInbox} row={props.row} />
                    </Box>
                }
                <Box>
                    {props.isInProcess ?
                        <InProcessModalMainContent isInbox={props.isInbox} row={props.row} />
                        :
                        <ModalMainContent isInbox={props.isInbox} row={props.row} />

                    }
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'} mt={10}>
                    <Button variant="outlined" size='large' onClick={handleClose}>
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </>
    )

}