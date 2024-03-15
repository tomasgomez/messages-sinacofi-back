import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { usePathname } from "next/navigation";

type NavegationItemType = {
  open?: boolean,
  nav: any,
  handleClick: any,
  isChild?: boolean,
  childSelected?: boolean,
};

const NavegationItem = ({ open, nav, handleClick, isChild, childSelected }: NavegationItemType) => {
  const pathname = usePathname();
  const isSelected = pathname === nav.url;
  return (
    <ListItemButton
      selected={(isSelected || childSelected) && !isChild}
      onClick={() => handleClick(nav.key)}
      style={{
        color: isSelected || childSelected ? "#0081A3" : "inherit",
        backgroundColor: (isSelected && !isChild) || childSelected ? "#DFF8FF" : "inherit",
        fontWeight: 600,
      }}
    >
      {nav.icon && (
        <ListItemIcon style={{ color: isSelected ? "#0081A3" : "inherit", minWidth: "auto", marginRight: 10 }}>
          {nav.icon}
        </ListItemIcon>
      )}
      <ListItemText primary={nav.label} sx={{
        color: isSelected ? "#0081A3" : "inherit",
        fontWeight: (isSelected || childSelected) ? "600" : "normal",
        ...(isChild ? { marginLeft: "24px" } : {}),
      }} />
      {/* <Badge>2</Badge> */}
      {!!nav.children?.length && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );
};

export default NavegationItem;
