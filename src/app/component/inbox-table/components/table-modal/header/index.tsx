import { StyledMoalSection, StyledModalItem } from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import { StyledCapitalizedSpan } from "../../../style";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { montserrat } from "@/utils/fonts";
import { MSDetail } from "../../../type";

export function ModalHeaderSection(props: { data: MSDetail; isInProcess?: boolean; }) {
    const { data } = props;

    return (
        <Box mb={0.75} pb={2}>
            <Grid container spacing={1} justifyContent={'space-around'} alignItems={'self-start'} >
                <Grid item xs={8}>
                    <StyledModalItem noWrap>
                        {`OSN-${data.OSN || data.TSN}`}
                    </StyledModalItem>
                    <Typography 
                        variant="h6" 
                        fontWeight={700} 
                        fontFamily={montserrat.style.fontFamily} 
                        mb={3}
                        fontSize={16}
                    >
                        MS {`${data.messageCode}`} - <StyledCapitalizedSpan style={{ textTransform: 'capitalize' }}>{`${data.description.toLowerCase()}`}</StyledCapitalizedSpan>
                    </Typography>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'flex-end'} gap={1}>
                    {/* <Button variant="contained" sx={{ color: 'white', textTransform: 'none', fontFamily: montserrat.style.fontFamily }} size="large">
                        <ReplyOutlinedIcon />
                        Responder
                    </Button> */}  {/* NOTE: This Button is not included in the latest Figma design. */}
                    <Button variant="contained" sx={{ color: 'white', textTransform: 'none', fontFamily: montserrat.style.fontFamily }} size="large">
                        <PrintOutlinedIcon />
                        Imprimir
                    </Button>
                </Grid>
            </Grid>
            <Stack spacing={2}>
                <Box>
                    <StyledMoalSection variant="h6">Detalles de Recepción</StyledMoalSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography fontSize={'12px'}>OSN</Typography>
                            <StyledModalItem noWrap>
                                {data.OSN}
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
            </Stack>
        </Box>
    )
}