import React from "react";
import { Modal, ModalFooter, ModalProps } from "..";
import { Button, Stack, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { montserrat } from "@/utils/fonts";

export type ErrorModalTypes = ModalProps & {
  title: string;
  body: React.ReactNode;
  onClose: () => void;
  onRetry: () => void;
  withoutRetry?: boolean;
};

export function ErrorModal(props: ErrorModalTypes) {
  const {
    title = "",
    body = null,
    onClose = () => null,
    onRetry = () => null,
    withoutRetry = false,
    withoutClose = false,
    open = false,
  } = props || {};

  return (
    <Modal
      withoutClose={withoutClose}
      maxWidth="500px"
      open={open}
      onClose={onClose}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        color={"black"}
        textAlign={"center"}
      >
        <Typography color={"red"} fontSize={"56px"}>
          <WarningAmberIcon fontSize="inherit" />
        </Typography>
        <Typography
          fontWeight={700}
          fontSize={"18px"}
          fontFamily={montserrat.style.fontFamily}
        >
          {title}
        </Typography>
        {body}
      </Stack>
      <ModalFooter placeContent="center" sx={{ px: 0, pb: 0, mt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            paddingX: 2,
            paddingY: 1,
            borderRadius: 3,
            fontFamily: montserrat.style.fontFamily,
          }}
        >
          Cancelar
        </Button>
        {!withoutRetry && (
          <Button
            onClick={onRetry}
            variant="contained"
            sx={{
              color: "white",
              paddingX: 2,
              paddingY: 1,
              borderRadius: 3,
              fontFamily: montserrat.style.fontFamily,
            }}
          >
            Volver a intentar
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default ErrorModal;
