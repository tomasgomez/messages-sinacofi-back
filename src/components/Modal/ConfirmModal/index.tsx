import { Modal } from "@/components/Modal";
import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { montserrat } from "@/utils/fonts";

const ConfirmModal = ({
  open,
  title,
  onClose,
  body,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: any;
  onClose: any;
  onConfirm: any;
}) => {
  return (
    <Box>
      <Modal maxWidth={523} open={open} onClose={onClose} withoutClose>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ErrorOutlineIcon fontSize="large" style={{ color: "#CBCBCB" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              fontFamily={montserrat.style.fontFamily}
              fontSize={16}
              fontWeight="bold"
              textAlign="center"
              style={{ padding: 16 }}
            >
              {title}
            </Typography>
            {body}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            width={256}
          >
            <Button
              variant="outlined"
              style={{
                fontSize: 14,
                textTransform: "none",
                padding: 16,
                height: 49,
                width: 121,
                fontFamily: montserrat.style.fontFamily,
              }}
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              style={{
                background: "#00B2E2",
                color: "white",
                fontSize: 14,
                textTransform: "none",
                padding: 16,
                height: 49,
                width: 121,
                fontFamily: montserrat.style.fontFamily,
              }}
              onClick={onConfirm}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConfirmModal;