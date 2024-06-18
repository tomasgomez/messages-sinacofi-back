import { Modal } from "@/components/Modal";
import { Box, Button, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
import { InfoOutlined, WarningAmberRounded } from "@mui/icons-material";

const icons: any = {
  warning: (
    <WarningAmberRounded
      fontSize="large"
      style={{ color: "#FFC742", fontSize: "48px" }}
    />
  ),
  info: (
    <InfoOutlined
      fontSize="large"
      style={{ color: "#898989", fontSize: "48px" }}
    />
  ),
};

const ConfirmModal = ({
  open,
  title,
  icon,
  onClose,
  body,
  onConfirm,
  sx,
}: {
  open: boolean;
  title: string;
  icon: string | any;
  body: any;
  onClose: any;
  onConfirm: any;
  sx: any;
}) => {
  return (
    <Box>
      <Modal
        maxWidth={523}
        sx={{ margin: 0, height: 320, top: "calc((100% - 320px)/4)", ...sx }}
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
          {icons[icon] || icon || icons.warning}
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
