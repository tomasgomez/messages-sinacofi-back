import { styled } from "@mui/system";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { montserrat } from "@/utils/fonts";
import { Box, Typography, Button } from "@mui/material";

export const EmptyScreenContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const StyledAddHomeOutlinedIcon = styled(AddHomeOutlinedIcon)({
  width: 64,
  height: 64,
  color: "#898989",
  opacity: 0.5,
});

export const StyledMainText = styled(Typography)({
  color: "#151515",
  fontFamily: montserrat.style.fontFamily,
  fontSize: 16,
  lineHeight: 1.5,
  fontWeight: 500,
  textAlign: "center",
  margin: "10px",
});

export const StyledText = styled(Typography)({
  color: "#898989",
  fontFamily: montserrat.style.fontFamily,
  fontSize: 14,
  lineHeight: 1.71,
  fontWeight: 500,
  textAlign: "center",
  margin: "0 10px 10px 10px",
});

export const StyledButtonAH = styled(Button)({
  width: 284,
  height: 48,
  color: "#FFF",
  textAlign: "center",
  fontFamily: "Montserrat",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: 1.42,
  letterSpacing: 0.1,
  margin: "10px",
});
