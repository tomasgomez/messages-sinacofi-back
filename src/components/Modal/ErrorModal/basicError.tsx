import { Typography } from "@mui/material";

const basicError = (error: any) => ({
  title: "Lo sentimos, ocurrió un error inesperado.",
  withoutRetry: true,
  body: (
    <Typography fontSize={14} fontWeight={400} style={{ padding: 16 }}>
      {error?.message}
    </Typography>
  ),
});

export default basicError;
