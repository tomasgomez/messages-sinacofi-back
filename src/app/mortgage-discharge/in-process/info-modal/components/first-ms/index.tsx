import React from "react";

import {
  StyledMoalSection,
  StyledModalItem,
} from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/material/Stack/Stack";
import { montserrat } from "@/utils/fonts";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { formatModalDetailsCompleted } from "@/utils/mortgage-discharge";
import {
  ChannelDetailsMSInfoModal,
  PropertyDetailsMSInfoModal,
} from "@/types/mortgage-discharge";
import { Message } from "@/app/component/inbox-table/type";

export function FirstMessageSection({
  dataMessage,
  showOnlyOneMessage = false,
}: {
  dataMessage: Message;
  showOnlyOneMessage: boolean;
}) {
  const [showContent, setShowContent] = React.useState(false);

  const { dataHeader, channelDetailsMS, propertyDetailsMS, bankDetailsMS } =
    formatModalDetailsCompleted(dataMessage);
  const handleShowContent = () => {
    setShowContent(!showContent);
  };

  return (
    <Box mb={0.75} mt="24px">
      <Grid>
        <Grid
          item
          xs={8}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <StyledModalItem noWrap>
              NSR {dataHeader?.NSR || "-"}
            </StyledModalItem>
            <Typography
              variant="h6"
              fontWeight={700}
              fontFamily={montserrat.style.fontFamily}
              fontSize={16}
            >
              MS {dataHeader?.messageCode || "-"} -{" "}
              {dataHeader?.description || "N/A"}
            </Typography>
          </Box>
          {!showOnlyOneMessage && (
            <IconButton onClick={handleShowContent}>
              {" "}
              {showContent ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          )}
        </Grid>
      </Grid>
      {(showOnlyOneMessage || showContent) && (
        <Stack spacing={2} mt={2}>
          <Box>
            <StyledMoalSection variant="h6">
              Detalles de Recepción
            </StyledMoalSection>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography fontSize={"12px"}>LSN</Typography>
                <StyledModalItem noWrap>
                  {dataHeader?.LSN || "-"}
                </StyledModalItem>
              </Grid>
              <Grid item xs={2}>
                <Typography fontSize={"12px"}>Institución Destino</Typography>
                <StyledModalItem noWrap>
                  {dataHeader?.receiver || "-"}
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
          <StyledMoalSection variant="h6">
            Contenido del Mensaje
          </StyledMoalSection>
          <Box display="flex">
            <Box width="400px" borderRight="1px solid #E5E5E5" mr="24px">
              {channelDetailsMS?.map((field: ChannelDetailsMSInfoModal) => {
                return (
                  <Stack
                    display="flex"
                    flexDirection="row"
                    mb={1}
                    key={`${field.accessor}-${field.value}`}
                  >
                    <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
                      {field.label}:
                    </Typography>
                    <StyledModalItem noWrap>
                      {field.value || "-"}
                    </StyledModalItem>
                  </Stack>
                );
              })}
            </Box>
            <Box>
              {propertyDetailsMS?.map((field: PropertyDetailsMSInfoModal) => {
                return (
                  <Stack
                    display="flex"
                    flexDirection="row"
                    mb={1}
                    key={`${field.accessor}-${field.value}`}
                  >
                    <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
                      {field.label}:
                    </Typography>
                    <StyledModalItem noWrap>
                      {field.value || "-"}
                    </StyledModalItem>
                  </Stack>
                );
              })}
            </Box>
          </Box>
          <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
            Con el objeto de cubrir eventuales diferencias que se puedan
            producir en las deudas que el(la) mencionado(a) señor(a) tiene con
            ustedes, les señalamos que el
          </Typography>
          <Stack display="flex" flexDirection="row" mb={1}>
            <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
              Banco:
            </Typography>
            <StyledModalItem noWrap>
              {bankDetailsMS?.bank || "-"}
            </StyledModalItem>
          </Stack>
          <Stack display="flex" flexDirection="row" mb={1}>
            <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
              Mantiene en su poder la cantidad de:
            </Typography>
            <StyledModalItem noWrap>
              $ {bankDetailsMS?.amountHeldByTheBank || "-"} CLP
            </StyledModalItem>
          </Stack>
          <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
            Con el objeto de aplicarlo al pago de las obligaciones referidas
            hasta el monto señalado. Este pago se realizará contra liquidaciones
            practicadas por Uds. Y conjuntamente con la entrega del préstamo
            indicado precedentemente en el plazo antedicho. Dicho compromiso lo
            cumpliremos dentro del plazo de 15 días hábiles bancarios, contados
            desde que se encuentren debidamente inscritas las hipotecas y
            prohibiciones en favor de nuestro banco y previo alzamiento de todo
            tipo de gravámenes, prohibiciones y embargos establecidos en vuestro
            favor respecto del inmueble señalado en la escritura, para lo cual
            solicitamos a ustedes comparecer en ella.
          </Typography>
          <Stack display="flex" flexDirection="row" mb={1}>
            <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
              Apoderado/Enviador:
            </Typography>
            <StyledModalItem noWrap>
              {`${bankDetailsMS?.debsName || "N/A"} - ${
                bankDetailsMS?.debtorRut || "N/A"
              }`}
            </StyledModalItem>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
