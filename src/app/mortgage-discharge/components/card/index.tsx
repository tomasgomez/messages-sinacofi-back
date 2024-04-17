import * as React from "react";
import {
  StyledContentCard,
  StyledCardContent,
  StyledCode,
  StyledCard,
  StyledButton,
  StyledBoxShadow,
} from "./styled";
import { Box, Typography, Collapse, Paper } from "@mui/material";
import StatusChip from "./statusChip";
import { montserrat } from "@/utils/fonts";
import CodeColumn from "./codeColumn";
import InfoColumn from "./infoColumn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import DataTable from "@/app/component/inbox-table";
import { columnsCard } from "./columns";
import { mockData } from "./mockData";

const CarDischarge = ({
  data,
  handlerTrackingModal,
}: {
  data: any;
  handlerTrackingModal: (state: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

  const handlerColapseCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledContentCard>
      <StyledCardContent>
        <StyledBoxShadow borderRadiusComplete={isOpen} style={{ zIndex: 3 }}>
          <StyledCard>
            {isOpen ? (
              <IconButton
                style={{ color: "#565656" }}
                onClick={handlerColapseCard}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            ) : (
              <IconButton
                style={{ color: "#565656" }}
                onClick={handlerColapseCard}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            )}
            <CodeColumn code={code} date={date} status={status} />
            <InfoColumn data={data} />
            <StyledButton onClick={handlerOpenModal}>
              Base de Seguimiento
            </StyledButton>
          </StyledCard>
        </StyledBoxShadow>
        <Collapse in={isOpen} style={{ width: "100%" }}>
          <Box>

          </Box>
          <DataTable
            rows={mockData}
            loading={false}
            columns={columnsCard}
            withCheckbox={false}
          />
        </Collapse>
      </StyledCardContent>
    </StyledContentCard>
  );
};

export default CarDischarge;
