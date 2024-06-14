import { Modal } from "@/components/Modal";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { montserrat } from "@/utils/fonts";

const SuccessModal = ({
  open,
  title,
  onClose,
  body,
  sx,
}: {
  open: boolean;
  title: string;
  body: React.ReactNode;
  onClose: any;
  sx?: any;
}) => {
  return (
    <Box>
      <Modal
        maxWidth={500}
        sx={{ margin: 0, height: 300, top: "calc((100% - 300px)/4)", ...sx }}
        open={open}
        onClose={onClose}
        withoutClose
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CheckCircleIcon fontSize="large" style={{ color: "#00BC70" }} />
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
              style={{ padding: 16 }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
              width="100%"
            >
              {body}
            </Box>
          </Box>
          <Button
            variant="contained"
            style={{
              background: "#00B2E2",
              color: "white",
              fontSize: 14,
              textTransform: "none",
              padding: 16,
              height: 48,
              fontFamily: montserrat.style.fontFamily,
            }}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SuccessModal;
