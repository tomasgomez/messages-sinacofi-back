import { Button, ClickAwayListener } from "@mui/material"
import { useState } from "react";
import Menu from "../Menu";
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";

type OptionMenu = {
  label: any,
  onClick: any
};

const ButtonMenu = ({ options, icon, label }: { options: OptionMenu[], icon?: any, label: string }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(() => true);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Menu options={options}>
        <Button
          variant="contained"
          size="large"
          sx={{ color: "#ffffff", width: "calc(100% - 40px)", margin: "20px", marginBottom: "12px", textTransform: "capitalize" }}
          onClick={handleClick}
          startIcon={icon}
          endIcon={open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        >
          {label}
        </Button>
      </Menu>
    </ClickAwayListener>
  )
}

export default ButtonMenu;