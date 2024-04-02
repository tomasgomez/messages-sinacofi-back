import { Button, ClickAwayListener } from "@mui/material";
import Menu from "../Menu";
import { ArrowDropDownOutlined, ArrowDropUpOutlined, EditOutlined } from "@mui/icons-material";
import { useCallback, useState } from "react";
import CreateIndividualMessageModal from "./CreateIndividualMessageModal";
import { useModalManager } from "../Modal/ModalManager";

const NewMessageButton = () => {
  const { onOpen } = useModalManager({
    component: CreateIndividualMessageModal
  });
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(() => true);
  
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Menu options={[
        {
          label: "Nuevo Mensaje Individual",
          onClick: onOpen,
        },
        {
          label: "Nuevo Mensaje PAMS Manual",
          onClick: () => {}
        }
      ]}>
        <Button
          variant="contained"
          size="large"
          sx={{ color: "#ffffff", width: "calc(100% - 40px)", margin: "20px", marginBottom: "12px", textTransform: "capitalize" }}
          onClick={handleClick}
          startIcon={<EditOutlined />}
          endIcon={open ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined />}
        >
          Nuevo Mensaje
        </Button>
      </Menu>
    </ClickAwayListener>
  );
};

export default NewMessageButton;
