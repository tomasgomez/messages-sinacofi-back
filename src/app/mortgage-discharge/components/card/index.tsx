import * as React from "react";
import {
  StyledContentCard,
  StyledButton,
  StyledBoxShadow,
  StyledFooterComponent,
  StyledInfoIcon,
} from "./styles";
import { Collapse, Typography } from "@mui/material";
import CodeColumn from "./codeColumn";
import InfoColumn from "./infoColumn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import DataTable from "@/app/component/inbox-table";
import { columnsCard } from "./columns";
import ProgressBar from "./progress-bar";
import {
  CodeCardMortgageDischarge,
  InforCardMortgageDischarge,
  ModalTrackingData,
} from "@/types/mortgage-discharge";
import { Message } from "@/app/component/inbox-table/type";
import { reverseArray } from "@/utils/functions";
import { MyContexLayout } from "@/app/context";
import { withRadioButton } from "@/utils/mortgage-discharge-utils";

const CarDischarge = ({
  data,
  handlerTrackingModal,
}: {
  data: any;
  handlerTrackingModal: (data?: ModalTrackingData) => void;
}) => {
  const [selectedMessage, setSelectorMessage] = React.useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = React.useState(false);

  // Change after add users "selectedInstitution"
  const { selectedInstitution } = React.useContext(MyContexLayout) as any;

  const {
    codeData,
    infoData,
    messages = [],
    buttonDisabled,
    modalTrackingData,
  }: {
    codeData: CodeCardMortgageDischarge;
    infoData: InforCardMortgageDischarge;
    messages: Message[];
    buttonDisabled: boolean;
    modalTrackingData: ModalTrackingData;
  } = data || {};

  const handlerColapseCard = () => {
    setIsOpen(!isOpen);
  };
  const handleFilterMessages = React.useCallback(
    (messages: Message[]): Message[] => {
      if (selectedMessage) {
        return messages?.filter(
          (message: Message) => message?.id === selectedMessage
        );
      } else {
        return messages;
      }
    },
    [selectedMessage]
  );

  const footerComponent = (text: string, fontSize?: number) => (
    <StyledFooterComponent>
      <StyledInfoIcon />
      <Typography fontSize={fontSize || 14}>{text}</Typography>
    </StyledFooterComponent>
  );

  const getFooterComponent = () => {
    // Si sos el que recibio el 670 mostras siempre el footer
    if (selectedInstitution === infoData?.institutionDestination) {
      return footerComponent(
        "Para continuar el flujo de mensajes es necesario actualizar el estado en la Base de Seguimiento"
      );
    } else {
      // Si sos el que envio el 670 y recibiste un 672 mostras el footer
      if (codeData?.lastMessageCode === "672") {
        return footerComponent(
          "Operación Rechazada. Puedes editar el mensaje 670 para reenviar esta solicitud. Motivo del Rechazo: Reparo Legal, Cláusula de Escritura",
          12
        );
      }
    }
  };

  return (
    <StyledContentCard>
      <StyledBoxShadow borderRadiusComplete={isOpen}>
        <div style={{ display: "flex" }}>
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
          <CodeColumn data={codeData} />
        </div>

        <InfoColumn data={infoData} />
        <StyledButton
          onClick={() => handlerTrackingModal(modalTrackingData)}
          disabled={buttonDisabled}
        >
          Base de Seguimiento
        </StyledButton>
      </StyledBoxShadow>
      <Collapse
        in={isOpen}
        style={{
          width: "100%",
          overflow: "inherit",
          boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
          borderRadius: "0px 0px 10px 10px",
          background: "#fff",
        }}
      >
        <ProgressBar
          data={messages}
          setSelectorMessage={setSelectorMessage}
          selectedMessage={selectedMessage}
        />
        <DataTable
          maxHeight={350}
          rows={handleFilterMessages(reverseArray(messages))}
          columns={columnsCard}
          withCheckbox={false}
          footerComponent={getFooterComponent()}
          withRadioButton={withRadioButton}
          rowsPerPageOptions={[]}
        />
      </Collapse>
    </StyledContentCard>
  );
};

export default CarDischarge;
