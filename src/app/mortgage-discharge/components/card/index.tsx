import * as React from "react";
import {
  StyledContentCard,
  StyledCardContent,
  StyledCard,
  StyledButton,
  StyledBoxShadow,
} from "./styled";
import { Collapse } from "@mui/material";
import CodeColumn from "./codeColumn";
import InfoColumn from "./infoColumn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import DataTable from "@/app/component/inbox-table";
import { columnsCard } from "./columns";
// import { mockDataAllCases as mockData } from "./mockData";
// import { mockData } from "./mockData";
import ProgressBar from "./progress-bar";
// import { reverseArray } from "@/utils/functions";
import {
  CodeCardMortgageDischarge,
  InforCardMortgageDischarge,
} from "@/utils/mortgage-discharge";
import { Message } from "@/app/component/inbox-table/type";

const CarDischarge = ({
  data,
  handlerTrackingModal,
}: {
  data: any;
  handlerTrackingModal: (state: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    codeData,
    InfoData,
    messages,
    buttonDisabled,
  }: {
    codeData: CodeCardMortgageDischarge;
    InfoData: InforCardMortgageDischarge;
    messages: Message[];
    buttonDisabled: boolean;
  } = data;

  const { cukCode, foreclosureDate, cukStatus } = codeData;

  const handlerOpenModal = () => {
    handlerTrackingModal(true);
    // console.log("handlerTrackingModal");
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
            <CodeColumn
              code={cukCode}
              date={foreclosureDate}
              status={cukStatus}
            />
            <InfoColumn data={InfoData} />
            <StyledButton onClick={handlerOpenModal} disabled={buttonDisabled}>
              Base de Seguimiento
            </StyledButton>
          </StyledCard>
        </StyledBoxShadow>
        <Collapse in={isOpen} style={{ width: "100%" }}>
          <ProgressBar data={messages} />
          <DataTable
            maxHeight={343}
            rows={messages}
            columns={columnsCard}
            withCheckbox={false}
            defaultOrderBy="id"
            defaultOrder="desc"
          />
        </Collapse>
      </StyledCardContent>
    </StyledContentCard>
  );
};

export default CarDischarge;
