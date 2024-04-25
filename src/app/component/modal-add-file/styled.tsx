import { styled } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";

export const StyleddropZone = styled("div")({
  width: 610,
  height: 148,
  position: "relative",
  border: "2px dashed #898989",
  borderRadius: 12,
  backgroundColor: "#F9F9F9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const StyledInput = styled("input")({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer",
});

export const StyledContainerButtons = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingTop: 32,
});

export const StyledCancelButton = styled(Button)({
  fontSize: 14,
  textTransform: "none",
  height: 49,
  width: 121,
  fontFamily: montserrat.style.fontFamily,
  marginRight: 16,
  borderRadius: 8,
});

export const StyledConfirmButton = styled(Button)({
  background: "#00B2E2",
  color: "white",
  fontSize: 14,
  textTransform: "none",
  height: 48,
  width: 160,
  fontFamily: montserrat.style.fontFamily,
  borderRadius: 8,
});
