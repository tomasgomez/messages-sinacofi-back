import {
  Box,
  ModalOwnProps,
  Modal as MuiModal,
  SxProps,
  Theme,
} from "@mui/material";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  innerRef?: any;
  sx?: SxProps<Theme>;
}

export function Modal(
  props: React.PropsWithChildren<
    Omit<ModalOwnProps, "children" | "onClose" | "open" | "sx" | "innerRef"> &
      ModalProps
  >
) {
  return (
    <MuiModal
      {...props}
      open={props.open || false}
      onClose={props.onClose}
      sx={{
        // maxHeight: "100vh",
        // overflowY: "auto",
        bgcolor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        ref={props.innerRef}
        sx={{
          maxWidth: "80%",
          position: "relative",
          left: "50%",
          transform: "translate(-50%, 0)",
          bgcolor: "background.paper",
          outline: "none",
          margin: "40px 0",
          borderRadius: 3,
          ...(props.sx || {}),
        }}
      >
        {props.children}
      </Box>
    </MuiModal>
  );
}
