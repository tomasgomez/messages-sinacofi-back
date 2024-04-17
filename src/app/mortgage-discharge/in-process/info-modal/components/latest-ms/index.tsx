import { StyledMoalSection, StyledModalItem } from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/material/Stack/Stack";
import { montserrat } from "@/utils/fonts";
import { detailsMS } from "../../types";
import { data, details } from "../constants";


export function LatestMessageSection() {

    return (
        <Box mb={0.75} pb={2}>
            <Grid>
                <Grid item xs={8}>
                    <StyledModalItem noWrap>
                        LSN 15050
                    </StyledModalItem>
                    <Typography 
                        variant="h6" 
                        fontWeight={700} 
                        fontFamily={montserrat.style.fontFamily} 
                        mb={3}
                        fontSize={16}
                    >
                        MS 671 - Aceptación Alzamiento Hipotecario 
                    </Typography>
                </Grid>
            </Grid>
            <Stack spacing={2}>
                <Box>
                    <StyledMoalSection variant="h6">Detalles de Envío</StyledMoalSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>LSN</Typography>
                            <StyledModalItem noWrap>
                                {data.TSN}
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
                <Stack spacing={3}>
                    <Box>
                        <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                            {details?.map((field: detailsMS) => {
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
                </Stack>
            </Stack>
        </Box>
    )
};
