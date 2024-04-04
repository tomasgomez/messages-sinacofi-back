'use client'
import { AccountBalance, AccountBalanceOutlined, ArrowDropDownOutlined, AssignmentIndOutlined, BarChart, CloudDownloadOutlined, ConnectWithoutContact, EditOutlined, EmailOutlined, ForwardToInbox, ForwardToInboxOutlined, GroupOutlined, Inbox, NotificationsNone, NotificationsNoneOutlined, SettingsApplicationsOutlined, StackedBarChart, WorkspacesOutlined } from "@mui/icons-material";
import { Button, Collapse, Container, List, } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavegationItem from "../List";
import { montserrat } from "@/utils/fonts";
import NewMessageButton from "./NewMessageButton";

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

const navList = [
  {
    key: "messages",
    label: "Mensajes",
    icon: <EmailOutlined />,
    childrenKeys: ["inbox", "sent", "prepared", "prending-reviews", "rejected", "mortgage-processes", "recovered", "create"],
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

  const handleClick = (section: string) => {
    setOpen(section === open ? "" : section);
  };

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
      <NewMessageButton />
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
      </List>
    </Container>
  );
};

export default SideBar;
