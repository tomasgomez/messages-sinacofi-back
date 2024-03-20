'use client'
import { AccountBalance, AccountBalanceOutlined, ArrowDropDownOutlined, AssignmentIndOutlined, BarChart, CloudDownloadOutlined, ConnectWithoutContact, EditOutlined, EmailOutlined, ForwardToInbox, ForwardToInboxOutlined, GroupOutlined, Inbox, NotificationsNone, NotificationsNoneOutlined, SettingsApplicationsOutlined, StackedBarChart, WorkspacesOutlined } from "@mui/icons-material";
import { Button, Collapse, Container, List, } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavegationItem from "./List";
import { montserrat } from "@/utils/fonts";

const Badge = ({ children }: { children: any }) => {
  return (
    <div style={{
      display: "flex",
      width: "16px",
      height: "16px",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#00B2E2",
      borderRadius: 50,
      color: "#ffffff",
      fontSize: 10,
      textAlign: "center",
      fontWeight: 600
    }}>{children}</div>
  )
}

const navListAdmin = [
  {
    key: "monitoring",
    label: "Monitoreo",
    icon: <BarChart />,
    url: "/"
  },
  {
    key: "intitutions",
    label: "Instituciones",
    icon: <AccountBalanceOutlined />,
    url: "/intitutions"
  },
  {
    key: "areas",
    label: "Áreas",
    icon: <WorkspacesOutlined />,
    url: "/areas"
  },
  {
    key: "users",
    label: "User",
    icon: <GroupOutlined />,
    url: "/users"
  },
  {
    key: "roles",
    label: "Roles",
    icon: <AssignmentIndOutlined />,
    url: "/roles"
  },
  {
    key: "connections",
    label: "Conexiones",
    icon: <ConnectWithoutContact />,
    url: "/connections"
  },
  {
    key: "system",
    label: "Sistema",
    icon: <SettingsApplicationsOutlined />,
    childrenKeys: ["typesOfMessages", "holidays", "typesOfOperations", "flows"],
    children: [
      {
        key: "typesOfMessages",
        label: "Tipos de mensajes",
        url: "/system/typesOfMessages",
      },
      {
        key: "holidays",
        label: "Feriados",
        url: "/system/holidays",
      },
      {
        key: "typesOfOperations",
        label: "Tipos de Operaciones",
        url: "/system/typesOfOperations",
      },
      {
        key: "flows",
        label: "Flujos",
        url: "/system/flows",
      },
    ],
  },
  {
    key: "notifications",
    label: "Notificaciones",
    icon: <Inbox />,
    url: "/notifications",
    children: [],
  },
];
const navList = [
  {
    key: "messages",
    label: "Mensajes",
    icon: <EmailOutlined />,
    childrenKeys: ["inbox", "sent", "prepared", "prending-reviews", "rejected", "mortgage-processes", "recovered"],
    children: [
      {
        key: "inbox",
        label: "Bandeja de Entrada",
        url: "/messages/inbox",
      },
      {
        key: "sent",
        label: "Enviados",
        url: "/messages/sent",
      },
      {
        key: "prepared",
        label: "Preparados",
        url: "/messages/prepared",
      },
      {
        key: "prending-reviews",
        label: "Críticos Pendientes",
        url: "/messages/prending-reviews",
      },
      {
        key: "rejected",
        label: "Rechazados",
        url: "/messages/rejected",
      },
      {
        key: "mortgage-processes",
        label: "Procesos Hipotecarios",
        url: "/messages/mortgage-processes",
      },
      {
        key: "recovered",
        label: "Recuperados",
        url: "/messages/recovered",
      },
    ],
  },
  {
    key: "fti-messaging",
    label: "Mensajería FTI",
    icon: <ForwardToInboxOutlined />,
    childrenKeys: ["monitoring", "pams-tams-configuration"],
    children: [
      {
        key: "monitoring",
        label: "Monitoreo",
        url: "/fti-messaging/monitoring"
      },
      {
        key: "pams-tams-configuration",
        label: "Configuración PAMS/TAMS",
        url: "/fti-messaging/pams-tams-configuration"
      },
    ],
  },
  {
    key: "statistics-reports",
    label: "Estadísticas y Reportes",
    icon: <StackedBarChart />,
    childrenKeys: ["its-institutions", "its-messages", "its-traffic"],
    children: [
      {
        key: "its-institutions",
        label: "Institución (ITS01)",
        url: "/statistics-reports/its-institutions"
      },
      {
        key: "its-messages",
        label: "Mensajes (ITS02)",
        url: "/statistics-reports/its-messages"
      },
      {
        key: "its-traffic",
        label: "Tráfico (ITS03)",
        url: "/statistics-reports/its-traffic"
      },
    ],
  },
  {
    key: "recovery",
    label: "Recuperación",
    icon: <CloudDownloadOutlined />,
    childrenKeys: ["per-nse", "per-osn"],
    children: [
      {
        key: "per-nse",
        label: "Por NSE",
        url: "/recovery/per-nse"
      },
      {
        key: "per-osn",
        label: "Por OSN",
        url: "/recovery/per-osn"
      },
    ],
  },
  {
    key: "notifications",
    label: "Notificaciones",
    icon: <NotificationsNoneOutlined />,
    url: "/notifications",
    children: [],
  },
];


const SideBar = () => {
  const [open, setOpen] = useState("");
  const pathname = usePathname();
  console.log({ pathname });
  const handleClick = (section: string) => {
    setOpen(section === open ? "" : section);
  };

  console.log({ open });
  useEffect(() => {
    const path = pathname.split("/");
    setOpen(path[path.length - 1]);
  }, [pathname]);

  return (
    <Container
      sx={{
        backgroundColor: "#ffffff",
        maxWidth: "270px !important",
        color: "#000000",
        margin: 0,
        zIndex: 1,
        padding: "0 !important",
        height: "calc(100vh - 64px)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
        ['*']:{
          fontFamily:montserrat.style.fontFamily,
        }

      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{ color: "#ffffff", width: "calc(100% - 40px)", margin: "20px", marginBottom: "12px", textTransform: "capitalize" }}
        startIcon={<EditOutlined />}
        endIcon={<ArrowDropDownOutlined />}
      >
        Nuevo Mensaje
      </Button>
      <List
        component="nav"

      >
        {navList.map((nav) => (
          nav.url ? (
            <Link href={nav.url} key={nav.key}>
              <NavegationItem nav={nav} open={open === nav.key} handleClick={handleClick} />
            </Link>
          ) : (
            <>
              <NavegationItem
              key={nav.key}
              nav={nav}
              open={open === nav.key || (!!nav.children?.length && nav.childrenKeys?.includes(open))}
              handleClick={handleClick}
              childSelected={!!nav.children?.length && nav.childrenKeys?.includes(open)}
            />
              {!!nav.children?.length && nav.children.length > 0 && (
                <Collapse in={open === nav.key || (!!nav.children?.length && nav.childrenKeys?.includes(open))} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {nav.children.map((subNav) => (
                      <Link href={subNav.url} key={nav.key}>
                        <NavegationItem nav={subNav} open={open === subNav.key} isChild handleClick={handleClick} />
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          )
        ))}
        {/* <Link href="/">
          <ListItemButton onClick={() => handleClick("monitoring")}>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Monitoreo" />
          </ListItemButton>
        </Link>
        <Link href="/users">
          <ListItemButton onClick={() => handleClick("users")}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </Link>
        <Link href="/roles">
          <ListItemButton onClick={() => handleClick("roles")}>
            <ListItemIcon>
              <AssignmentIndOutlined />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={() => handleClick("conexions")}>
          <ListItemIcon>
            <ConnectWithoutContact />
          </ListItemIcon>
          <ListItemText primary="Conexiones" />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick("system")}>
          <ListItemIcon>
            <SettingsApplicationsOutlined />
          </ListItemIcon>
          <ListItemText primary="Sistema" />
          {open === "system" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "system"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Tipos de mensajes" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Feriados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Tipos de Operaciones" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Flujos" />
              <Badge>2</Badge>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleClick("notifications")}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Notificationes" />
          <Badge>2</Badge>
        </ListItemButton> */}
      </List>
        {/* <ListItemButton onClick={() => handleClick("msg")}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Messages" />
          {open === "msg" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "msg"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Bandeja de Entrada" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Enviados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Rechazados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Procesos Hipotecarios" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Recuperados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Preparados" />
              <Badge>2</Badge>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleClick("preparations")}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Preparativos" />
          {open === "preparations" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "preparations"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Bandeja de Entrada" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Enviados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Rechazados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Procesos Hipotecarios" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Recuperados" />
              <Badge>2</Badge>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Preparados" />
              <Badge>2</Badge>
            </ListItemButton>
          </List>
        </Collapse>
      </List> */}
    </Container>
  );
};

export default SideBar;
