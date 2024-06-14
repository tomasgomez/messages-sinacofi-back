import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const FilterSectorCard = styled(Box)`
  border-radius: var(--Components-Card-border-radius, 10px);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 24px;
  flex-direction: column;
  width: 100%;
`;

export const FilterHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CollapseContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

export const RadioButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

export const FilterGroup = styled(Box)`
  display: flex;
  gap: 16px;
  height: 56px;
`;

export const StyledContainerButtons = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 24px;
  margin: 16px;
`;