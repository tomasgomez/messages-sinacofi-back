"use client";
import * as React from "react";
import DropdrownInbox from "../inbox-dropdown";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  StyledInboxHeaderContent,
  StyledTitleAndDropdown,
  StyledSubtitleAndIcons,
  StyledIconsContent,
} from "./style";
import { Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";

export default function InboxHeader(props: { amountMessages: number }) {
  const { amountMessages } = props;
  return (
    <StyledInboxHeaderContent>
      <StyledTitleAndDropdown
        sx={{
          m: 2,
        }}
        width="100%"
      >
        <Typography variant="h5">Bandeja de Entrada</Typography>
        <DropdrownInbox widthDropdown={300} />
      </StyledTitleAndDropdown>
      <StyledSubtitleAndIcons
        sx={{
          m: 2,
          mt: 0,
        }}
        width="100%"
      >
        <Typography variant="subtitle1" sx={{ color: "#898989", fontFamily:montserrat.style.fontFamily }}>
          {amountMessages} mensajes en total
        </Typography>
        <StyledIconsContent width={88}>
          <RefreshIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => console.log("Refresh")}
          />
          <PrintOutlinedIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => console.log("Print")}
          />
          <FileDownloadOutlinedIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => console.log("Download")}
          />
        </StyledIconsContent>
      </StyledSubtitleAndIcons>
    </StyledInboxHeaderContent>
  );
}
