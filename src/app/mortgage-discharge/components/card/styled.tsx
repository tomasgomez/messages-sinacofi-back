import { Box, Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { styled, CSSObject } from "@mui/system";
import { montserrat } from "@/utils/fonts";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider";

interface StyledContentCardProps {
  height?: number;
}

export const StyledContentCard = styled(Box)<StyledContentCardProps>(
  ({ height }: StyledContentCardProps): CSSObject => ({
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
    margin: "36px",
    height: height ? `${height}px` : "auto", // Si height existe, se establece, de lo contrario, se ajusta automáticamente
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })
);

export const StyledCard = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
    borderRadius: "10px", // o utiliza props.theme o una variable CSS
  })
);

export const StyledCode = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledButton = styled(Button)`
  padding: 10px 16px;
  height: 40px;
  border: 1px solid #00b2e2;
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
