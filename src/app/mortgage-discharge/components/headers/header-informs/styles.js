import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  flex-direction: column;
  width: 100%;
`;

export const HeaderContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  padding-bottom: 24px;
  margin-top: 16px;
`;

export const ContainerFilters = styled(Box)`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
