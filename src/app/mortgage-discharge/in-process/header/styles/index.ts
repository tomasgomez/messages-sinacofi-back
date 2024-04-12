import { styled } from "@mui/system";

import { Box } from "@mui/material";

export const StyledSubtitleAndIcons = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 26px;
  flex-direction: column;
`;

export const HeaderContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  padding-bottom: 24px;
`;

export const FilterContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2;
  gap: 20px;
`;

export const toggleButtonSx = {
  color: '#1D1B20',
  width: '103px',
  fontSize: '14px',
  padding: '11px 14px',
  borderRadius: '8px',
  borderColor: 'primary.main',
  textTransform: 'Capitalize',
  '&.Mui-selected, &.Mui-selected:hover': {
    background: '#00B2E2',
    color: '#fff'
  }
};
