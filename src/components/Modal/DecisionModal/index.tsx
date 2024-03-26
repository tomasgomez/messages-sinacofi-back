import { Modal } from "@/components/Modal";
import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { montserrat } from "@/utils/fonts";

const DecisionModal = ({
  isOpen,
  title,
  onClose,
  body,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  body: any;
  onClose: any;
  onConfirm: any;
}) => {
  return (
    <div>
      <Modal maxWidth={523} open={isOpen} onClose={onClose} withoutClose>
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
    </div>
  );
};

export default DecisionModal;
