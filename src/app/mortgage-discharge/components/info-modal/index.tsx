import { Modal } from "@/app/component/Modal/Modal";
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Loader from "@/components/Loader";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFTemplate } from "@/app/component/PDFTemplate";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MessageDetails } from "./components/message-details";
import { MessageDetails670 } from "./components/message-details-670";
import { CardContext } from "../store/ModalStore";
import { findPreviousMessage670 } from "@/utils/mortgage-discharge-utils";
import { sortMessagesOldToNew } from "@/utils/messagesFuntions";
import { MyContexLayout } from "@/app/context";
import { Message } from "@/app/component/inbox-table/type";
import { getMessageDetails } from "@/app/services/common";
import { getForeClosureDataCards } from "../../api-calls";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { useModalManager } from "@/components/Modal";
import { reverseArray } from "@/utils/functions";

export const InfoModal = () => {
  const [details, setDetails] = useState<Message[]>([]);
  const [pdfView, setPdfView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOnlyOneMessage, setShowOnlyOneMessage] = useState<boolean>(true);
  const { modalIsOpen, setModalIsOpen, selectedMessage } =
    useContext(CardContext);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const { selectedInstitution } = useContext(MyContexLayout) as any;
  const { ErrorModal } = useModalManager() as any;

  const handleClose = () => {
    setModalIsOpen(false);
    setPdfView(false);
  };

  const handlePrint = () => {
    setPdfView(true);
  };

  const fetchData = async () => {
    try {
      if (modalIsOpen && selectedMessage) {
        setShowOnlyOneMessage(true);
        setIsLoading(true);

        // Get the cuck and save only the messages and sort oldest to newest
        // If we have to do a Dropdown, we can save all messages in a state and with the dropdown select the message
        const cukData = await getForeClosureDataCards([
          { label: "cukCode", value: selectedMessage?.cukCode || "" },
          { label: "institutionCode", value: selectedInstitution || "" },
        ]);

        const extraMessages: Message[] = sortMessagesOldToNew(
          cukData[0]?.messages || []
        );
        // The get allways return a list
        const messageSelectedDetails: Message[] = await getMessageDetails(
          selectedMessage?.id
        );

        // If you selected the first 670 show only this message
        // How the array was sorted => the first message is 670 and the first is 670
        if (selectedMessage?.id === extraMessages[0]?.id) {
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
            ...(await getMessageDetails(previousMessage670?.id as string)),
            ...messageSelectedDetails,
          ]);

          // Set the state to show 2 details in the modal
          setShowOnlyOneMessage(false);
        }

        setIsLoading(false);
      }
    } catch (error: unknown) {
      setDetails([]);
      setIsLoading(false);
      ErrorModal.open(basicError(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, [modalIsOpen]);

  const height = Math.max(0.8 * window.innerHeight, 650);

  return (
    <Modal
      innerRef={contentRef}
      sx={{
        color: "black",
        p: "40px",
        maxWidth: "960px",
        height: height,
        overflow: "auto",
        margin: 0,
        top: `calc((100% - ${height}px) / 2)`,
      }}
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
          <Loader label="Cargando Detalle..." minHeight="100%" />
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
              <PDFTemplate data={reverseArray(details)} />
            </PDFViewer>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "100%",
              height: "100%",
            }}
          >
            <Grid item xs={4} position="absolute" right={40} top={45}>
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
                {details[1]?.messageCode === "670" ? (
                  <MessageDetails670
                    showOnlyOneMessage
                    dataMessage={details[1]}
                  />
                ) : (
                  <MessageDetails dataMessage={details[1]} />
                )}
              </Box>
            )}
            <MessageDetails670
              showOnlyOneMessage={showOnlyOneMessage}
              dataMessage={details[0]}
            />
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
          </div>
        )
      ) : (
        <Loader label="Cargando Detalle..." />
      )}
    </Modal>
  );
};
