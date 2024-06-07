import { Box, Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { styled, CSSObject } from "@mui/system";
import { montserrat } from "@/utils/fonts";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider";
import CheckIcon from "@mui/icons-material/Check";
import LinearProgress from "@mui/material/LinearProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface StyledContentCardProps {
  height?: number;
}

export const StyledContentCard = styled(Box)<StyledContentCardProps>(
  ({ height }: StyledContentCardProps): CSSObject => ({
    background: "#fff",
    padding: "10px 32px 10px 32px",
    height: height ? `${height}px` : "auto",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    width: "100%",
  })
);

export const StyledCard = styled(Box)`
  display: flex;
  align-items: center;
  margin: 16px;
`;

interface StyledBoxShadowProps {
  borderRadiusComplete?: boolean;
}

export const StyledBoxShadow = styled(Box)<StyledBoxShadowProps>(
  ({ borderRadiusComplete }: StyledBoxShadowProps): CSSObject => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderRadius: borderRadiusComplete
      ? "10px 10px 0px 0px"
      : "10px 10px 10px 10px",
    background: "#fff",
    boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
    transition: "border-radius 0.3s ease",
    padding: 16,
    overflow: "inherit",
  })
);

export const StyledCardContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

interface StyledChipProps {
  colorText?: string;
  background?: string;
}

export const StyledChip = styled(Chip)<StyledChipProps>(
  ({ colorText, background }: StyledChipProps): CSSObject => ({
    height: 14,
    color: colorText || "inherit",
    backgroundColor: background || "inherit",
    fontSize: 12,
    cursor: "default",
    marginTop: 3,
    borderRadius: "10px",
  })
);

export const StyledCode = styled(Box)`
  margin: 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledButton = styled(Button)`
  padding: 10px 16px;
  margin; 0px 16px;
  height: 40px;
  min-width: 190px;
  border: ${(props) =>
    props.disabled ? "1px solid #bdbdbd" : "1px solid #00b2e2"};
  border-radius: 8px;
  color: #00b2e2;
  text-align: center;
  font-family: ${montserrat.style.fontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.42;
  letter-spacing: 0.1px;
`;

export const StyleInfoColumn = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  margin: 0px 16px;
`;

export const StyledDivider = styled(Divider)`
  background-color: #e5e5e5;
  margin-left: 10px;
  margin-right: 10px;
`;

export const StyledTypographyText = styled(Typography)`
  color: #49454f;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

export const StyledTypographyData = styled(Typography)`
  color: #1d1b20;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.42;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

////////////////////////////////// Progress Bar ////////////////////////////////////////////////////////////

export const StyledContainerProgressBar = styled(Box)`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const StyledContainerTitleProgressBar = styled(Box)`
  height: 40px;
  width: 90px;
  margin: 16px;
`;

export const StyledTitleProgressBar = styled(Typography)`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.42;
  max-width: 80px;
  margin-right: 16px;
`;

export const StyledContainerBar = styled(Box)`
  display: flex;
  overflow-x: scroll;
`;

interface StyledStyledContainerBlockProps {
  isSelected?: boolean;
}

export const StyledContainerBlock = styled(
  Box
)<StyledStyledContainerBlockProps>(
  ({ isSelected }: StyledStyledContainerBlockProps): CSSObject => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "end",
    opacity: isSelected ? 1 : 0.33,
    transition: "opacity 0.3s ease",
  })
);

export const StyledContainerBlockStatus = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
  cursor: pointer;
`;
interface StyledContainerIconProps {
  status?: string;
}

const getbackgroundColorIcon = (status?: string): string => {
  switch (status) {
    // Recibido
    case "06":
      return "#ECEFFF";
    // Enviado
    case "05":
      return "#EFFCFF";
    // Pendiente de Firma
    case "01":
      return "#00B2E2";
    // Default
    default:
      return "#00B2E2";
  }
};

export const StyledContainerIcon = styled(Box)<StyledContainerIconProps>(
  ({ status }: StyledContainerIconProps): CSSObject => ({
    width: 20,
    height: 20,
    backgroundColor: getbackgroundColorIcon(status),
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })
);

interface StyledCheckIconProps {
  iconColor?: string;
}

const getColorIcon = (iconColor?: string): string => {
  switch (iconColor) {
    case "06":
      return "#0C2093";
    case "05":
      return "#00B2E2";
    case "01":
      return "black";
    default:
      return "#00B2E2";
  }
};

export const StyledCheckIcon = styled(CheckIcon)<StyledCheckIconProps>(
  ({ iconColor }: StyledCheckIconProps): CSSObject => ({
    width: 16,
    height: 16,
    color: getColorIcon(iconColor),
  })
);

export const StyledTypographyCode = styled(Typography)`
  color: #151515;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  margin-top: 4px;
`;

export const StyledTypographyStatus = styled(Typography)`
  color: #151515;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
`;

interface StyledLinearProgressProps {
  borderRadius?: string;
  backgroundColor?: string;
  borderRight?: boolean;
}

const getBorderRadius = (borderRadius?: string): string => {
  switch (borderRadius) {
    case "left":
      return "5000px 0px 0px 5000px";
    case "right":
      return "0px 5000px 5000px 0px";
    case "center":
      return "0px";
    default:
      return "0px";
  }
};

export const StyledLinearProgress = styled(
  LinearProgress
)<StyledLinearProgressProps>(
  ({
    borderRadius,
    backgroundColor,
    borderRight,
  }: StyledLinearProgressProps): CSSObject => ({
    height: 8,
    width: `calc((100vw - 462px) / 8)`,
    borderRadius: getBorderRadius(borderRadius),
    borderRight: borderRight ? "1px solid #FFF" : "none",
    backgroundColor: "#d9d9d9",
    "& .MuiLinearProgress-bar": {
      backgroundColor: backgroundColor || "transparent",
    },
  })
);

export const StyledFooterComponent = styled("div")`
  color: #565656;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;

export const StyledInfoIcon = styled(InfoOutlinedIcon)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
