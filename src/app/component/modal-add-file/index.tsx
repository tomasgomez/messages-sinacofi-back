import { Modal } from "@/components/Modal";
import { Box, Button, Typography } from "@mui/material";
import { montserrat } from "@/utils/fonts";
import React, { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  StyleddropZone,
  StyledInput,
  StyledContainerButtons,
  StyledCancelButton,
  StyledConfirmButton,
  StyledContentBody,
  StyledContentInput,
  StyledSpanClick,
  StyledText,
  StyledCenterBoxColumn,
  StyledCenterBoxRow,
} from "./styled";

const AddFileModal = ({
  isOpen = false,
  onClose = () => null,
  onConfirm = () => null,
}: {
  isOpen: boolean;
  onClose: any;
  onConfirm: any;
}) => {
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    setFile(selectedFile);
  };
  return (
    <Box>
      <Modal maxWidth={698} open={isOpen} onClose={onClose}>
        <Typography
          fontFamily={montserrat.style.fontFamily}
          fontSize={20}
          fontWeight="bold"
          style={{ padding: "16px 16px 32px 0px" }}
        >
          Carga de Reparo Escritura AH
        </Typography>
        <StyledContentBody>
          <Box>
            <StyleddropZone onDragOver={handleDragOver} onDrop={handleDrop}>
              <StyledInput
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
              />
              {!file && (
                <StyledContentInput>
                  <FileUploadOutlinedIcon style={{ color: "#565656" }} />
                  <StyledText
                    fontWeight={500}
                    fontFamily={montserrat.style.fontFamily}
                    style={{
                      color: "rgba(31, 31, 32, 0.70)",
                      margin: 8,
                    }}
                  >
                    Arrastre su Documento de Copia Maestra o haga{" "}
                    <StyledSpanClick>click aquí</StyledSpanClick> y selecciónalo
                    desde su ordenador.
                  </StyledText>
                  <StyledText
                    width={510}
                    style={{
                      color: "rgba(31, 31, 32, 0.40)",
                    }}
                  >
                    Documentos en Formato PDF
                  </StyledText>
                </StyledContentInput>
              )}
              {file && (
                <StyledCenterBoxColumn>
                  <StyledCenterBoxRow>
                    <img
                      src="/imagenPDF.png"
                      loading="lazy"
                      width="30"
                      height="30"
                    />
                    <StyledText
                      fontSize={16}
                      fontFamily={montserrat.style.fontFamily}
                      style={{
                        cursor: "pointer",
                        padding: 16,
                      }}
                    >
                      {file?.name}
                    </StyledText>
                  </StyledCenterBoxRow>
                  <StyledText
                    style={{
                      color: "#00B2E2",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: 16,
                    }}
                  >
                    Volver a Cargar Archivo...
                  </StyledText>
                </StyledCenterBoxColumn>
              )}
            </StyleddropZone>
          </Box>
          <StyledContainerButtons width={"100%"}>
            <StyledCancelButton variant="outlined" onClick={onClose}>
              Cancelar
            </StyledCancelButton>
            <StyledConfirmButton variant="contained" onClick={onConfirm}>
              Adjuntar Archivo
            </StyledConfirmButton>
          </StyledContainerButtons>
        </StyledContentBody>
      </Modal>
    </Box>
  );
};

export default AddFileModal;
