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
};

export function ErrorModal(props: ErrorModalTypes) {
  return (
    <Modal withoutClose={props.withoutClose} maxWidth="500px" open={props.open}>
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
          {props.title}
        </Typography>
        {props.body}
      </Stack>
      <ModalFooter placeContent="center" sx={{ px: 0, pb: 0 }}>
        <Button
          onClick={props.onClose}
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
        <Button
          onClick={props.onRetry}
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
      </ModalFooter>
    </Modal>
  );
}
