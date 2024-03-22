'use client'
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AppBar as AppBarMui, Box, Container, Stack, Typography } from "@mui/material";
import SinacofiBrand from "../../assets/sinacofi-icon.svg";
import { ArrowDropDown, HelpOutline, Logout, SettingsOutlined } from "@mui/icons-material";
import Menu from "./Menu";
import SearchField from "./SearchField";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  // const currentTime = new Date();
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(new Date());
      console.log({ updateTime: new Date() });
    }, 1000);
    console.log("TIMER:", { timer,  });

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return <Typography variant="caption">{currentTime.toLocaleString().replace(",", "")}</Typography>;
}

const MenuOptions = () => {
  const options = useMemo(() => {
    return [
      {
        label: "Configuration",
        icon: <SettingsOutlined sx={{ color: "#898989" }} />
      },
      {
        label: "Ayuda",
        icon: <HelpOutline sx={{ color: "#898989" }} />
      },
      {
        label: "Salir",
        icon: <Logout sx={{ color: "#898989" }} />
      },
    ]
  }, []);

  return (
    <Menu options={options}>
      <Typography color="#565656" fontWeight={500} variant="body1">4002701</Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="caption" fontWeight={600} color="#151515">03 - Tratador Mensajes Tipo 7</Typography>
        <ArrowDropDown sx={{ color: "#898989" }} />
      </div>
    </Menu>
  );
};

const AppBar = () => {
  const date = useMemo(() => new Date(), []);
  return (
    <AppBarMui
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        fontFamily: "Roboto",
        boxShadow: "none",
        flexDirection: "row",
      }}
    >
      <Stack flexDirection="row" justifyContent="start" alignItems="center" sx={{
        width: "100vw !important", zIndex: 2,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
      }}>
        <Container sx={{
          padding: "8px 24px",
          zIndex: 2,
          width: "auto",
          margin: 0,
        }} >
          <Image
            height={27}
            src={SinacofiBrand} alt={"Sinacofi"}
          />
          <Box sx={{
            color: "#000000",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: 400
          }}>
            <Time />
          </Box>
        </Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "calc(100% - 180px)"}}
        >
          <Stack direction="row">
            <Container
              sx={{
                flexDirection: "column",
                margin: 0,
                width: "210px",
                display: "flex",
                cursor: "default",
                justifyContent: "center",
              }}
            >
              <Typography color="#565656" fontWeight={500} variant="caption">Nombre de Institución</Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" fontWeight={600} color="#151515">0027 CORP BANCA</Typography>
              </div>
            </Container>
            <Container
              sx={{
                flexDirection: "column",
                margin: 0,
                width: "210px",
                display: "flex",
                cursor: "default",
                justifyContent: "center",
              }}
            >
              <Typography color="#565656" fontWeight={500} variant="caption">Área de Institución</Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" fontWeight={600} color="#151515">05 ÁREA TID</Typography>
              </div>
            </Container>
            <SearchField data={[]} placeholder="Buscar..." />
          </Stack>
          <Container
            sx={{
              flexDirection: "column",
              margin: 0,
              width: "auto",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <MenuOptions />
          </Container>
        </Stack>
      </Stack>
    </AppBarMui>
  );
};

export default AppBar;
