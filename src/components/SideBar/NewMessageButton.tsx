import { Button } from "@mui/material";
import Menu from "../Menu";
import { Add } from "@mui/icons-material";
import { useModal } from "../Modal";
import { ModalList } from "../Modal/ModalList";

const NewMessageButton = () => {
  const CreateMessageModal = useModal({ id: ModalList.CreateIndividualMessageModal });
  
  return (
    <Button
      variant="contained"
      size="large"
      sx={{ color: "#ffffff", width: "calc(100% - 40px)", margin: "20px", marginBottom: "12px", textTransform: "capitalize" }}
      onClick={CreateMessageModal.open}
      startIcon={<Add />}
    >
      Nuevo AH
    </Button>
  );
};

export default NewMessageButton;
