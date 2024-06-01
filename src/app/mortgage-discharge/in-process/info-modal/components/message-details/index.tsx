import {
  StyledMoalSection,
  StyledModalItem,
} from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/material/Stack/Stack";
import { montserrat } from "@/utils/fonts";
import { formatModalDetailSmall } from "@/utils/mortgage-discharge-format";
import DocumentCard from "../document-card";

export function MessageDetails({ dataMessage = [] }: { dataMessage: any }) {
  const { dataHeader, smallMsDetail, documents } =
    formatModalDetailSmall(dataMessage);

  return (
    <Box mb={0.75} pb={2}>
      <Grid>
        <Grid item xs={8}>
          <StyledModalItem noWrap>LSN {dataHeader?.LSN}</StyledModalItem>
          <Typography
            variant="h6"
            fontWeight={700}
            fontFamily={montserrat.style.fontFamily}
            mb={3}
            fontSize={16}
          >
            {`MS ${dataHeader?.messageCode || "-"} -
              ${dataHeader?.description || "N/A"}`}
          </Typography>
        </Grid>
      </Grid>
      <Stack spacing={2}>
        <Box>
          <StyledMoalSection variant="h6">Detalles de Envío</StyledMoalSection>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography fontSize={"12px"}>LSN</Typography>
              <StyledModalItem noWrap>{dataHeader?.LSN || "-"}</StyledModalItem>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={"12px"}>Institución Destino</Typography>
              <StyledModalItem noWrap>
                {dataHeader?.destination || "-"}
              </StyledModalItem>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={"12px"}>Fecha</Typography>
              <StyledModalItem noWrap>
                {dataHeader?.creationDate || "-"}
              </StyledModalItem>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={"12px"}>Hora</Typography>
              <StyledModalItem noWrap>
                {dataHeader?.creationTime || "-"}
              </StyledModalItem>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={"12px"}>Prioridad</Typography>
              <StyledModalItem noWrap>
                {dataHeader?.priority || "-"}
              </StyledModalItem>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={"12px"}>Autenticación</Typography>
              <StyledModalItem noWrap>
                {dataHeader?.aunthetication || "-"}
              </StyledModalItem>
            </Grid>
          </Grid>
        </Box>
        <Stack spacing={3}>
          <Box>
            <StyledMoalSection variant="h6">
              Contenido del Mensaje
            </StyledMoalSection>
            {smallMsDetail?.map((row, rowIndex) => (
              <>
                {row.title && (
                  <Typography fontSize="14px" color="#49454F" mr={1.5} mb={2}>
                    {row.title}
                  </Typography>
                )}
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  key={rowIndex}
                >
                  {row.data.map((column: any, colIndex: number) => (
                    <Box
                      style={{ display: "flex", flexDirection: "column" }}
                      borderLeft={colIndex ? "1px solid #E5E5E5" : "none"}
                      key={colIndex}
                      justifyContent="center"
                    >
                      {column.map((field: any, fieldIndex: number) => (
                        <Stack
                          display="flex"
                          flexDirection="row"
                          mb={1}
                          key={`${colIndex}-${fieldIndex}`}
                          ml={colIndex ? "24px" : "0px"}
                          mr={"24px"}
                        >
                          <Typography fontSize="12px" color="#49454F" mr={1.5}>
                            {field.label}:
                          </Typography>
                          <StyledModalItem noWrap>
                            {field.value || "-"}
                          </StyledModalItem>
                        </Stack>
                      ))}
                    </Box>
                  ))}
                </Box>
              </>
            ))}
          </Box>
        </Stack>
      </Stack>
      <Stack display="flex" flexDirection="row" alignItems="center">
        {documents.map((document: any, index: number) => (
          <DocumentCard
            document={document}
            key={`${document.documentName}-${index}-document`}
          />
        ))}
      </Stack>
    </Box>
  );
}
