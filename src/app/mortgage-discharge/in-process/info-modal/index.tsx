import { Modal } from "@/app/component/Modal/Modal";
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Loader from "@/components/Loader";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFTemplate } from "@/app/component/PDFTemplate";
import React, { useContext, useEffect } from "react";
import { LatestMessageSection } from "./components/latest-ms";
import { FirstMessageSection } from "./components/first-ms";
import { CardContext } from "../store/ModalStore";
import { findPreviousMessage670 } from "@/utils/mortgage-discharge";
import { sortMessagesOldToNew } from "@/utils/messages";

export const InfoModal = () => {
  const [details, setDetails] = React.useState<undefined | any[]>([]);
  const [pdfView, setPdfView] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showOnlyOneMessage, setShowOnlyOneMessage] =
    React.useState<boolean>(true);

  const { modalIsOpen, setModalIsOpen, selectedMessage } =
    useContext(CardContext);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handlePrint = () => {
    setPdfView(true);
  };

  const fetchData = async () => {
    try {
      if (modalIsOpen && selectedMessage) {
        setIsLoading(true);

        // Get the cuck and save only the messages and sort oldest to newest
        // If we have to do a Dropdown, we can save all messages in a state and with the dropdown select the message
        const extraMessages = sortMessagesOldToNew(
          (
            await fetch(
              `/api/message/foreclosure?cukCode=${selectedMessage?.cukCode}`
            ).then((res) => res.json())
          )[0].messages
        );

        const messageSelectedDetails = await fetch(
          `/api/message/detail?id=${selectedMessage?.id}`
        ).then((res) => res.json());

        // If you selected the first 670 show only this message
        // How the array was sorted => the first message is 670 and the first is 670
        if (selectedMessage.id === extraMessages[0].id) {
          // Save only the selected messages
          setDetails(messageSelectedDetails);
        } else {
          // If you selected another message, we need to get the previous 670
          // to display next to the selected message
          const previousMessage670 = findPreviousMessage670(
            extraMessages,
            selectedMessage?.id
          );

          // Save the selected message and the previous 670 message
          setDetails([
            ...messageSelectedDetails,
            ...(await fetch(
              `/api/message/detail?id=${previousMessage670?.id}`
            ).then((res) => res.json())),
          ]);

          // Set the state to show 2 details in the modal
          setShowOnlyOneMessage(false);
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al solicitar detalle del mensajes", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [modalIsOpen]);

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
            {!showOnlyOneMessage && (
              <Box borderBottom="1px dashed #898989">
                <LatestMessageSection dataMessage={details[1]} />
              </Box>
            )}
            <Box>
              <FirstMessageSection
                showOnlyOneMessage={showOnlyOneMessage}
                dataMessage={details[0]}
              />
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
