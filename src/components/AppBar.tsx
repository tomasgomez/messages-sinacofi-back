"use client";
import { signOut } from "next-auth/react";
import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AppBar as AppBarMui,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import SinacofiBrand from "../../assets/sinacofi-icon.svg";
import {
  ArrowDropDown,
  HelpOutline,
  Logout,
  SettingsOutlined,
} from "@mui/icons-material";
import Menu from "./Menu";
// import SearchField from "./SearchField";
import InstitutionDropdown from "./FieldTypes/InstitutionDropdown";
import { MyContexLayout } from "@/app/context";
import { SessionProviderContext } from "@/context/SessionProvider";
import { completeInstitutions } from "@/utils/intitutions";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(new Date());
      console.log({ updateTime: new Date() });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Typography variant="caption">
      {currentTime.toLocaleString().replace(",", "")}
    </Typography>
  );
};

const AppBar = () => {
  // Delete after add users
  const { userInfo } = useContext(SessionProviderContext);
  const { selectedInstitution, setSelectedInsitution } = useContext(
    MyContexLayout
  ) as any;

  const MenuOptions = () => {
    const options = useMemo(() => {
      return [
        {
          label: "Configuration",
          icon: <SettingsOutlined sx={{ color: "#898989" }} />,
        },
        {
          label: "Ayuda",
          icon: <HelpOutline sx={{ color: "#898989" }} />,
        },
        {
          label: "Salir",
          icon: <Logout sx={{ color: "#898989" }} />,
          onClick: () => {
            fetch("/api/logout")
              .then((res) => res.json())
              .then((res) => {
                signOut({ callbackUrl: res.url, redirect: true });
              });
          },
        },
      ];
    }, []);

    return (
      <Menu options={options}>
        <Typography color="#565656" fontWeight={500} variant="body1">
          {userInfo?.user?.name}
        </Typography>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="caption" fontWeight={600} color="#151515">
            03 - Tratador Mensajes Tipo {userInfo?.user?.role}
          </Typography>
          <ArrowDropDown sx={{ color: "#898989" }} />
        </Box>
      </Menu>
    );
  };

  useEffect(() => {
    if (userInfo?.user) {
      setSelectedInsitution(userInfo?.user?.institutionCode);
    }
  }, [userInfo?.user]);

  return (
    <AppBarMui
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        fontFamily: "Roboto",
        boxShadow: "none",
        flexDirection: "row",
        maxHeight: "67px",
      }}
    >
      <Stack
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
        sx={{
          width: "100vw !important",
          zIndex: 2,
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
        }}
      >
        <Container
          sx={{
            padding: "8px 24px",
            zIndex: 2,
            width: "auto",
            margin: 0,
          }}
        >
          <Image height={27} src={SinacofiBrand} alt={"Sinacofi"} />
          <Box
            sx={{
              color: "#000000",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            <Time />
          </Box>
        </Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "calc(100% - 180px)" }}
        >
          <Stack direction="row">
            {process.env.NEXT_PUBLIC_TEST_ENV ? (
              <Container
                sx={{
                  flexDirection: "column",
                  margin: 0,
                  width: "210px",
                  display: "flex",
                  cursor: "default",
                  justifyContent: "center",
                  marginRight: 6,
                }}
              >
                <InstitutionDropdown
                  label="Nombre de Institución"
                  defaultValue={userInfo?.user?.institutionCode}
                  selected={selectedInstitution}
                  width={200}
                  onChange={(institutionCode: any) => {
                    setSelectedInsitution(institutionCode);
                  }}
                  placeholder="Seleccione una Institución"
                />
              </Container>
            ) : (
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
                <Typography color="#565656" fontWeight={500} variant="caption">
                  Nombre de Institución
                </Typography>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" fontWeight={600} color="#151515">
                    {completeInstitutions(selectedInstitution)}
                  </Typography>
                </Box>
              </Container>
            )}
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
              <Typography color="#565656" fontWeight={500} variant="caption">
                Área de Institución
              </Typography>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" fontWeight={600} color="#151515">
                  05 ÁREA TID
                </Typography>
              </Box>
            </Container>
            {/* // Comment until the next MVP */}
            {/* <SearchField data={[]} placeholder="Buscar..." /> */}
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
