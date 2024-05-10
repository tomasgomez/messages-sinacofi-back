import { styled } from "@mui/system";
import { Box, Button,CSSObject, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";

import CheckIcon from "@mui/icons-material/Check";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

interface StyledCheckIconProps {
  iconColor?: string;
}

interface StyledContainerIconProps {
  status?: string;
  border?: string;
}

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

export const StyledConfirmButton = styled(Button)((props: any) => ({
  backgroundColor: !props.disabled ? "#00B2E2" : "rgba(0, 0, 0, 0.12)",
  color: "white",
  fontSize: 14,
  textTransform: "none",
  height: 48,
  width: 160,
  fontFamily: montserrat.style.fontFamily,
  borderRadius: 8,
  textWrap: 'nowrap'
}));

export const StyledCenterBoxRow = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledCenterBoxColumn = styled(StyledCenterBoxRow)({
  flexDirection: "column",
});

export const StyledContentBody = styled(StyledCenterBoxColumn)({});

export const StyledContentInput = styled(StyledCenterBoxColumn)({
  width: 510,
  justifyContent: "space-around",
});

export const StyledSpanClick = styled("span")({
  color: "#00B2E2",
});

export const StyledText = styled(Typography)({
  fontSize: 14,
  textAlign: "center",
  fontStyle: "normal",
  lineHeight: 1.42,
});

export const StyledContentHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
});
export const StepStatusContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
});

export const FileStatusStepContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
});
export const FileStatusStep = styled(Typography)({
  fontSize: 10,
  fontWeight: 500,
  textAlign: "center",
  lineHeight: '12px',
  width: '40px',
  textWrap: 'wrap'
});

export const StyledContainerIcon = styled(Box)<StyledContainerIconProps>(
  ({ status, border }: StyledContainerIconProps): CSSObject => ({
    width: 14,
    height: 14,
    backgroundColor: status,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border:  `1px solid ${border}`,
  })
);

export const StyledNextStep = styled(Box)({
    width: 14,
    height: 14,
    backgroundColor: '#CBCBCB',
    borderRadius: "50%",
  }
);

export const StyledCheckIcon = styled(CheckIcon)<StyledCheckIconProps>(
  ({ iconColor }: StyledCheckIconProps): CSSObject => ({
    width: 10,
    height: 10,
    color: '#00BC70',
  })
);

export const StyledUploadIcon = styled(FileUploadOutlinedIcon)<StyledCheckIconProps>(
  ({ iconColor }: StyledCheckIconProps): CSSObject => ({
    width: 10,
    height: 10,
    color: '#00B2E2',
  })
);