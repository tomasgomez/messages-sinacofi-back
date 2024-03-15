'use client'
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AppBar as AppBarMui, Box, Container } from "@mui/material";
import SinacofiBrand from "../../assets/sinacofi-icon.svg";

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
  return <span>{currentTime.toLocaleString().replace(",", "")}</span>;
}

const AppBar = () => {
  const date = useMemo(() => new Date(), []);
  return (
    <AppBarMui position="static"
      sx={{
        backgroundColor: "#ffffff",
        fontFamily: "Roboto",
        zIndex: 999,
      }}>
        <Container sx={{ padding: "8px 24px", zIndex: 2, maxWidth: "100vw !important", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)", }}>
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
    </AppBarMui>
  );
};

export default AppBar;
