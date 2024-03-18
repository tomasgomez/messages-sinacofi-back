import React from "react";
import { Box, Button, Grid, Link, Stack, Typography, styled } from "@mui/material";
import { Modal, ModalContent, ModalHeader } from "../../Modal";
import { Data } from "../type";
import { StyledModalItem, StyledMoalSection } from "../../inbox-header/style";
import Image from "next/image";
import Signature from '../../../../../assets/signature.png'


export function InProcessModalHeaderSection(props: { row: Data; isInProcess?:boolean; }) {
    return (
        <Box borderBottom={'dashed'} mb={2} pb={2}>
            <Grid container spacing={1} justifyContent={'space-around'} alignItems={'center'}>
                <Grid item xs={8}>
                    <StyledModalItem noWrap>
                        {`OSN-${props.row.osn}`}
                    </StyledModalItem>
                    <StyledMoalSection variant="h6">
                        {`${props.row.ms} - ${props.row.message}`}
                    </StyledMoalSection>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'flex-end'} gap={1}>
                    <Button variant="contained" sx={{ color: 'white' }} size="large">
                        Responder
                    </Button>
                    <Button variant="contained" sx={{ color: 'white' }} size="large">
                        Imprimir
                    </Button>
                </Grid>
            </Grid>
            <Stack spacing={2}>
                <Box>
                    <StyledMoalSection variant="h6">Detalles de recepción</StyledMoalSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>OSN</Typography>
                            <StyledModalItem noWrap>
                                {props.row.osn}
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
                                chauchis
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Image src={Signature} width={100} height={50} alt='signature' />
                        </Grid>
                        <Grid item xs={2}>
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
                            <Box borderRadius={1} bgcolor={'#F8F8F8;'} p={1}>
                                <Typography fontSize={12}>Holis</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box borderRadius={1} bgcolor={'#F8F8F8;'} p={1}>
                                <Typography fontSize={12}>Holis</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box borderRadius={1} bgcolor={'#F8F8F8;'} p={1}>
                                <Typography fontSize={12}>Holis</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box borderRadius={1} bgcolor={'#F8F8F8;'} p={1}>
                                <Typography fontSize={12}>Holis</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box borderRadius={1} bgcolor={'#F8F8F8;'} p={1}>
                                <Typography fontSize={12}>Holis</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    )
}


export function ModalMainContent(props:{row:Data, isinProcess?:boolean;}){
    return(
        <>
            <Grid container spacing={1} justifyContent={'space-around'} alignItems={'center'}>
                    <Grid item xs={10}>
                        <StyledModalItem noWrap>
                            {`OSN-${props.row.osn}`}
                        </StyledModalItem>
                        <StyledMoalSection variant="h6">
                            {`${props.row.ms} - ${props.row.message}`}
                        </StyledMoalSection>
                    </Grid>
                    {!props.isinProcess &&
                    <Grid item xs={2} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant="contained" sx={{ color: 'white' }} size="large">
                            Imprimir
                        </Button>
                    
                    </Grid>
                    }
                </Grid>
                <Stack spacing={4}>
                    <Box>
                        <StyledMoalSection variant="h6">Detalles de recepción</StyledMoalSection>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>OSN</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.osn}
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
                                    chauchis
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
                                    {props.row.osn}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Cargo del Responsable</Typography>
                                <StyledModalItem noWrap>
                                    0001 Banco de Chile
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Teléfono</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.date}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>No. de Referencia</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.time}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Nombre de Institución</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Modalidad</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography fontSize={'12px'}>
                        LA INSTITUCION EMISORA DEL MENSAJE ASUME LA TOTAL RESPONSABILIDAD AF3:POR EL CONTENIDO DE ESTE, EL CUAL SERA CONSIDERADO, EN CASO DE APROBACION, COMO DOCUMENTO OFICIAL DE ESTA INSTITUCION; EL BANCO CENTRAL DE CHILE NO TENDRA NINGUN TIPO DE RESPONSABILIDAD RESPECTO DE DICHO CONTENIDO Y LA TRANSACCION QUEDARA SUJETA A SU APROBACION.
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Nombre del Responsable</Typography>
                            <StyledModalItem noWrap>
                                {props.row.osn}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Cargo del Responsable</Typography>
                            <StyledModalItem noWrap>
                                0001 Banco de Chile
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Teléfono</Typography>
                            <StyledModalItem noWrap>
                                {props.row.date}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>No. de Referencia</Typography>
                            <StyledModalItem noWrap>
                                {props.row.time}
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Nombre de Institución</Typography>
                            <StyledModalItem noWrap>
                                chauchis
                            </StyledModalItem>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>Modalidad</Typography>
                            <StyledModalItem noWrap>
                                chauchis
                            </StyledModalItem>
                        </Grid>
                    </Grid>
                    <Typography fontSize={'12px'}>Observaciones</Typography>
                </Stack>
        </>
    )
}



export function InProcessModalMainContent(props:{row:Data, isinProcess?:boolean;}){
    return(
        <>
            <Grid container spacing={1} justifyContent={'space-around'} alignItems={'center'}>
                    <Grid item xs={10}>
                        <StyledModalItem noWrap>
                            {`OSN-${props.row.osn}`}
                        </StyledModalItem>
                        <StyledMoalSection variant="h6">
                            {`${props.row.ms} - ${props.row.message}`}
                        </StyledMoalSection>
                    </Grid>
                    {!props.isinProcess &&
                    <Grid item xs={2} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant="contained" sx={{ color: 'white' }} size="large">
                            Imprimir
                        </Button>
                    
                    </Grid>
                    }
                </Grid>
                <Stack spacing={4}>
                    <Box>
                        <StyledMoalSection variant="h6">Detalles de recepción</StyledMoalSection>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>OSN</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.osn}
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
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                        <Grid container spacing={2} my={1   }>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Fecha de Alzamiento</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.osn}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Canal</Typography>
                                <StyledModalItem noWrap>
                                    0001 Banco de Chile
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Tipo de Operación</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.date}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography fontSize={'12px'}>Notaria Repertorio</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.time}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Typography fontSize={'12px'}>Fecha Repertorio</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Typography fontSize={'12px'}>Número Repertorio</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                        </Grid>
                        <Grid container width={'90%'} spacing={2}>
                        <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Institución</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                        <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Vendedor</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.osn}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>RUT de Vendedor</Typography>
                                <StyledModalItem noWrap>
                                    0001 Banco de Chile
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Comprador</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.date}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontSize={'12px'}>RUT de Comprador</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.time}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Tipo de Inmueble</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography fontSize={'12px'}>Descripción del Inmueble</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Comuna</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Región</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Institución</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontSize={'12px'}>Acreedor</Typography>
                                <StyledModalItem noWrap>
                                    0001 Banco de Chile
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Monto del mutuo</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.date}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>{"Plazo (Años)"}</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.time}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontSize={'12px'}>Monto del Mutuo Complementario</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Cargo del Responsable</Typography>
                                <StyledModalItem noWrap>
                                    0001 Banco de Chile
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Teléfono</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.date}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>No. de Referencia</Typography>
                                <StyledModalItem noWrap>
                                    {props.row.time}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontSize={'12px'}>Nombre de Institución</Typography>
                                <StyledModalItem noWrap>
                                    chauchis
                                </StyledModalItem>
                            </Grid>

                        </Grid>
                    </Box>
                    <Typography fontSize={'12px'}>Observaciones</Typography>
                </Stack>
        </>
    )
}


export function ModalLink(props: { row: Data; isInProcess?:boolean; }) {
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
                {props.row.osn}
            </Link>
            <Modal sx={{ color: 'black', p:2, pb:4 }} open={isOpen} onClose={handleClose}>
                <Box p={0} display={'flex'} justifyContent={'flex-end'}>
                    <Button onClick={handleClose}>
                        <Typography fontSize={20}>
                            X
                        </Typography>
                    </Button>
                </Box>
                {props.isInProcess &&
                <Box px={2}>
                    <InProcessModalHeaderSection row={props.row} />
                </Box>
                }
                <Box p={2}>
                    {props.isInProcess ? 
                    <InProcessModalMainContent row={props.row}/>
                    :
                    <ModalMainContent row={props.row}/>
                    
                }
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'}>
                        <Button variant="outlined" size='large' onClick={handleClose}>
                            Cerrar
                        </Button>
                </Box>
            </Modal>
        </>
    )

}