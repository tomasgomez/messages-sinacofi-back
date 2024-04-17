import Box from "@mui/material/Box/Box";
import { FilterSectorCard } from "../styles";
import { DatePickerInput } from "./form-elements/date";
import { DestinyDropdown } from "./form-elements/destiny-dropdown";
import { RutInput } from "./form-elements/rut-input";
import { RegionDropdown } from "./form-elements/region-dropdown";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import { CloseRounded } from "@mui/icons-material";

export const FilterSelector = (props: {onClose: Function}) => {

    const handleClose = () => {
        props.onClose(false)
    };
    return (
        <FilterSectorCard>
            <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", right: "10px", top: "10px" }}
            >
                <CloseRounded />
            </IconButton>
            <Typography variant="h6" fontWeight={500} mb={2}fontSize={16}>
                Filtros
            </Typography>
                <DatePickerInput />
                <DestinyDropdown />
                <RutInput label="RUT Comprador" />
                <RutInput label="RUT Vendedor" />
                <RutInput label="RUT Deudor" />
                <RegionDropdown />
                <Box display={'flex'} justifyContent={'space-between'} >
                    <Button variant="outlined" sx={{color: '#00B2E2', width:"125px", borderColor: 'transparent'}} onClick={() => {}}>
                        Borrar Filtros
                    </Button>
                    <Button variant="contained" sx={{color: '#FFF', width:"125px"}} onClick={() => {}}>
                        Aplicar
                    </Button>
                </Box>
        </FilterSectorCard>
    )
};