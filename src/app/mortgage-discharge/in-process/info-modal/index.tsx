import { Modal } from "@/app/component/Modal/Modal";
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Loader from "@/components/Loader";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFTemplate } from "@/app/component/PDFTemplate";
import React, { useContext } from "react";
import { LatestMessageSection } from "./components/latest-ms";
import { FirstMessageSection } from "./components/first-ms";
import { CardContext } from "../store/ModalStore";

export const InfoModal = () => {
  const [details, setDetails] = React.useState<undefined | any[]>([{}]);
  const [pdfView, setPdfView] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { modalIsOpen, setModalIsOpen } = useContext(CardContext);
  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handlePrint = () => {
    setPdfView(true);
  };

  return (
    <Modal
      sx={{ color: "black", p: "40px", maxWidth: "960px" }}
      open={modalIsOpen}
      onClose={handleClose}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: "10px", top: "10px" }}
      >
        <CloseRounded />
      </IconButton>
      {!!details ? (
        isLoading ? (
          <Loader label="Cargando Detalle..." />
        ) : pdfView ? (
          <>
            <Typography
              variant="h6"
              fontWeight={700}
              fontFamily={montserrat.style.fontFamily}
              mb={3}
              fontSize={16}
            >
              Previsualización de impresión
            </Typography>
            <PDFViewer width="100%" height="450px">
              <PDFTemplate data={details} />
            </PDFViewer>
          </>
        ) : (
          <>
            <Grid item xs={4} position="absolute" right={40}>
              <Button
                onClick={handlePrint}
                variant="contained"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontFamily: montserrat.style.fontFamily,
                }}
                size="large"
              >
                <PrintOutlinedIcon />
                Imprimir
              </Button>
            </Grid>
            <Box borderBottom="1px dashed #898989">
              <LatestMessageSection />
            </Box>
            <Box>
              <FirstMessageSection />
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
              <Button
                variant="contained"
                sx={{ color: "#FFF" }}
                size="large"
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </Box>
          </>
        )
      ) : (
        <Loader label="Cargando Detalle..." />
      )}
    </Modal>
  );
};
