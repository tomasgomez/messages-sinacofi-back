import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";

export const StyledInboxHeaderContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const StyledTitleAndDropdown = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSubtitleAndIcons = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledIconsContent = styled(Box)`
  color: #565656;
  display: flex;
  justify-content: space-between;
`;

export const StyledModalItem= styled(Typography)`
  max-width:80%;
  font-size:14px;
`

export const StyledMoalSection=styled(Typography)`
  font-size: 16px;
  font-weight:600;
  font-family: ${montserrat.style.fontFamily};
  margin-bottom:24px;
`
