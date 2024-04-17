import React from "react";

import { StyledMoalSection, StyledModalItem } from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/material/Stack/Stack";
import { montserrat } from "@/utils/fonts";

import { dataMS670, detailsMS670Canal, detailsMS670Inmueble } from "../constants";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { detailsMS } from "../../types";
import { IconButton } from "@mui/material";


export function FirstMessageSection() {
    const [showContent, setShowContent] = React.useState(false);

    const data = dataMS670;
    const handleShowContent = () => {
        setShowContent(!showContent);
    };

    return (
        <Box mb={0.75} mt="24px">
            <Grid>
                <Grid item xs={8} display="flex" justifyContent='space-between' alignItems="center">
                    <Box>
                        <StyledModalItem noWrap>
                            NSR 43007
                        </StyledModalItem>
                        <Typography 
                            variant="h6" 
                            fontWeight={700} 
                            fontFamily={montserrat.style.fontFamily} 
                            fontSize={16}
                        >
                            MS 670 - Alzamiento Hipotecario
                        </Typography>
                    </Box>
                    <IconButton onClick={handleShowContent}> {showContent ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                </Grid>
            </Grid>
            {showContent && (
                <Stack spacing={2} mt={2}>
                    <Box>
                        <StyledMoalSection variant="h6">Detalles de Recepción</StyledMoalSection>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>LSN</Typography>
                                <StyledModalItem noWrap>
                                    {data.NSR}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Institución Destino</Typography>
                                <StyledModalItem noWrap>
                                    {data.sender}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Fecha</Typography>
                                <StyledModalItem noWrap>
                                    {data.creationDate}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Hora</Typography>
                                <StyledModalItem noWrap>
                                    {data.creationTime}
                                </StyledModalItem>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography fontSize={'12px'}>Prioridad</Typography>
                                <StyledModalItem noWrap>
                                    {data.priority}
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
                    <StyledMoalSection variant="h6" >Contenido del Mensaje</StyledMoalSection>
                    <Box display='flex'>
                        <Box width="400px" borderRight="1px solid #E5E5E5" mr="24px">
                            {detailsMS670Canal?.map((field: detailsMS) => {
                                return (  
                                    <Stack display="flex" flexDirection="row" mb={1} key={field.value}>
                                        <Typography fontSize={'12px'} color="#49454F" mr={1.5}>{field.label}:</Typography>
                                        <StyledModalItem noWrap>
                                            {field.value || '-'}
                                        </StyledModalItem>
                                    </Stack>
                                )
                            })}
                        </Box>
                        <Box>
                            {detailsMS670Inmueble?.map((field: detailsMS) => {
                                return (  
                                    <Stack display="flex" flexDirection="row" mb={1} key={field.value}>
                                        <Typography fontSize={'12px'} color="#49454F" mr={1.5}>{field.label}:</Typography>
                                        <StyledModalItem noWrap>
                                            {field.value || '-'}
                                        </StyledModalItem>
                                    </Stack>
                                )
                            })}
                        </Box>
                    </Box>
                    <Typography fontSize={'12px'} color="#49454F" mr={1.5}>
                        Con el objeto de cubrir eventuales diferencias que se puedan producir en las deudas que el(la) mencionado(a) señor(a) tiene con ustedes, les señalamos que el
                    </Typography>
                    <Stack display="flex" flexDirection="row" mb={1} >
                        <Typography fontSize={'12px'} color="#49454F" mr={1.5}>Banco:</Typography>
                        <StyledModalItem noWrap>
                            Banco Internacional
                        </StyledModalItem>
                    </Stack>
                    <Stack display="flex" flexDirection="row" mb={1} >
                        <Typography fontSize={'12px'} color="#49454F" mr={1.5}>Mantiene en su poder la cantidad de:</Typography>
                        <StyledModalItem noWrap>
                            $5.000.000 CLP
                        </StyledModalItem>
                    </Stack>
                    <Typography fontSize={'12px'} color="#49454F" mr={1.5}>Con el objeto de aplicarlo al pago de las obligaciones referidas hasta el monto señalado. Este pago se realizará contra liquidaciones practicadas por Uds. Y conjuntamente con la entrega del préstamo indicado precedentemente en el plazo antedicho. Dicho compromiso lo cumpliremos dentro del plazo de 15 días hábiles bancarios, contados desde que se encuentren debidamente inscritas las hipotecas y prohibiciones en favor de nuestro banco y previo alzamiento de todo tipo de gravámenes, prohibiciones y embargos establecidos en vuestro favor respecto del inmueble señalado en la escritura, para lo cual solicitamos a ustedes comparecer en ella.
                    </Typography>
                    <Stack display="flex" flexDirection="row" mb={1} >
                        <Typography fontSize={'12px'} color="#49454F" mr={1.5}>Apoderado/Enviador:</Typography>
                        <StyledModalItem noWrap>
                            Rafael Peñaloza Gutiérrez - 34.323.233-3
                        </StyledModalItem>
                    </Stack>
                </Stack>
            )}
        </Box>
    )
};
