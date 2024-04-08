import { StyledMoalSection, StyledModalItem } from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { MSDetail, MSParameter } from "../../../type";

export function ModalMainContent(props: { data: MSDetail, isinProcess?: boolean; }) {
    return (
        <>
            <Stack spacing={3}>
                <Box>
                    <StyledMoalSection variant="h6">Contenido del Mensaje</StyledMoalSection>
                        {props.data?.parameters.map((field: MSParameter) => {
                            return (  
                                <Stack display="flex" flexDirection="row" mb={1} key={field.name}>
                                    <Typography fontSize={'12px'} color="#49454F" mr={1.5}>{field.label}:</Typography>
                                    <StyledModalItem noWrap>
                                        {field.value || '-'}
                                    </StyledModalItem>
                                </Stack>
                            )
                        })}
                </Box>
            </Stack>
        </>
    )
}