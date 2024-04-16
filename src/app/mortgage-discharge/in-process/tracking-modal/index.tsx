import { Modal } from "@/app/component/Modal/Modal"
import { montserrat } from "@/utils/fonts"
import { CloseRounded } from "@mui/icons-material"
import { Box, Button, IconButton } from "@mui/material"
import Typography from "@mui/material/Typography/Typography"
import { CardDetails } from "./components/card-details"
import { CardStatusUpdate } from "./components/card-status-update"
import { MortgageStatusDropdown } from "./components/dropdown-mortgage-status"
import { buttonUpdateStateSecondarySx, buttonUpdateStateSx } from "./components/styles"


export const TrackingModal = (props: {open: boolean, onClose: (state: boolean) => void}) => {

    const handleClose = () => {
        props.onClose(false);
    };

    return (
        <Modal 
            sx={{color: 'black',p: "40px",maxWidth: "960px"}}
            open={props.open}
            onClose={handleClose}
        >
            <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: "10px", top: "10px" }}
                >
                <CloseRounded />
            </IconButton>
            <Typography variant="body1" fontWeight={400}>
                AH00090000000040
            </Typography>
            <Typography variant="h6" fontWeight={700} fontFamily={montserrat.style.fontFamily} mb='20px' fontSize={20} >
                Base de Seguimiento Alzamiento Hipotecario
            </Typography>
            <Box display="flex" gap="20px" >
                <CardDetails/>
                <CardStatusUpdate />
            </Box>
            <Box display="flex" my="28px">
                <Box flex={1}>
                    <Typography variant="body1" fontWeight={500} fontFamily={montserrat.style.fontFamily} fontSize={16} >
                        Estado Alzamiento Hipotecario
                    </Typography>
                    <Typography variant="caption" fontWeight={400} fontFamily={montserrat.style.fontFamily} fontSize={14} >
                        Actualizar el estado de la operación AH
                    </Typography>
                </Box>
                <Box>
                    <MortgageStatusDropdown />
                </Box>
            </Box>
            <Box display="flex" justifyContent='end' gap="12px">
                <Button sx={buttonUpdateStateSx} variant="outlined">Cerrar</Button>
                <Button sx={buttonUpdateStateSecondarySx} variant="contained">Actualizar Estado</Button>
            </Box>
      </Modal>
    )
};
