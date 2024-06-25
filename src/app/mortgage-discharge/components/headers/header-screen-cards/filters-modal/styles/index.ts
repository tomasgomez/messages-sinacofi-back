import { styled } from "@mui/system";

import Button from "@mui/material/Button/Button";
import Card from "@mui/material/Card/Card";

export const FilterButton = styled(Button)`
  padding: 11px 20px;
  border: 1px solid #00b2e2;
  font-size: 14px;
  border-radius: 8px;
`;

export const FilterSectorCard = styled(Card)`
  position: absolute;
  padding: 20px;
  z-index: 100;
  right: 0;
  margin-top: 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  // Delete if you don't want to limit in the card filter
  overflow: auto;
  height: calc(100% - 225px);
  max-height: 800px;
  ////////////
`;
