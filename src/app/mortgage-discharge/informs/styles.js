import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { montserrat } from "@/utils/fonts";

export const StyledPaper = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0px;
`;

export const StyledTypography = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  font-family: ${montserrat.style.fontFamily};
  padding: 24px;
`;

export const StyledBox = styled(Box)`
  border-radius: var(--Components-Card-border-radius, 10px);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 16px;
  width: calc(100% - 32px);
`;

export const StyledTableTitle = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;
