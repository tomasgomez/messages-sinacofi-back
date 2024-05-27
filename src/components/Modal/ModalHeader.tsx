import { Box, SxProps, Theme, Typography } from "@mui/material";

interface ModalHeaderProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function ModalHeader(props: React.PropsWithChildren<ModalHeaderProps>) {
  return (
    <Box
      sx={{
        width: "100%",
        p: 6,
        pb: 2,
        display: "flex",
        borderRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        ...(props.sx || {}),
      }}
    >
      <Box>
        <Box sx={{ display: "flex" }}>
          {props.icon && (
            <Box
              sx={{
                mr: 2,
                display: "flex",
                alignItems: "center",
                opacity: "0.57",
              }}
            >
              {props.icon}
            </Box>
          )}
          <Typography variant="h5">{props.title}</Typography>
        </Box>
        <Typography variant="body2" mt={3}>
          {props.subtitle}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>{props.children}</Box>
    </Box>
  );
}
