import { useModal } from "@/components/Modal";
import { ModalList } from "@/components/Modal/ModalList";
import { Add } from "@mui/icons-material";
import {
  EmptyScreenContainer,
  StyledAddHomeOutlinedIcon,
  StyledButtonAH,
  StyledMainText,
  StyledText,
} from "./styles";

const EmptyScreen = (props: { height: number }) => {
  const { height = 474 } = props || {};
  const CreateMessageModal = useModal({
    id: ModalList.CreateIndividualMessageModal,
  });

  return (
    <EmptyScreenContainer height={height}>
      <StyledAddHomeOutlinedIcon />
      <StyledMainText>
        Actualmente no tienes ninguna solicitud de alzamiento hipotecario activa
      </StyledMainText>
      <StyledText width={340}>
        Haz clic en el botón de abajo para comenzar una nueva solicitud de
        hipoteca.
      </StyledText>
      <StyledButtonAH
        variant="contained"
        onClick={CreateMessageModal.open}
        startIcon={<Add />}
      >
        Nuevo Alzamiento Hipotecario
      </StyledButtonAH>
    </EmptyScreenContainer>
  );
};

export default EmptyScreen;
