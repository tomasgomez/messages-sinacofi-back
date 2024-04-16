import * as React from "react";
import {
  StyledContentCard,
  StyledCardContent,
  StyledCode,
  StyledButton,
} from "./styled";
import { Box, Typography } from "@mui/material";
import StatusChip from "./statusChip";
import { montserrat } from "@/utils/fonts";
import CodeColumn from "./codeColumn";
import InfoColumn from "./infoColumn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CarDischarge = ({
  data,
  handlerTrackingModal,
}: {
  data: any;
  handlerTrackingModal: (state: boolean) => void;
}) => {
  const {
    code,
    date,
    status,
  }: {
    code: string;
    date: string;
    status: string;
  } = data;

  const handlerOpenModal = () => {
    // handlerTrackingModal(true);
    console.log("handlerTrackingModal");
  };

  return (
    <StyledContentCard height={90}>
      <StyledCardContent>
        <KeyboardArrowRightIcon />
        <CodeColumn code={code} date={date} status={status} />
        <InfoColumn data={data} />
        <StyledButton onClick={handlerOpenModal}>
          Base de Seguimiento
        </StyledButton>
      </StyledCardContent>
    </StyledContentCard>
  );
};

export default CarDischarge;
