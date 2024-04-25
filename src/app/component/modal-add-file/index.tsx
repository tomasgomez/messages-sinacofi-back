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
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <StyleddropZone onDragOver={handleDragOver} onDrop={handleDrop}>
              <StyledInput
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
              />
              {!file && (
                <div
                  style={{
                    width: 510,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <FileUploadOutlinedIcon style={{ color: "#565656" }} />
                  <Typography
                    textAlign="center"
                    fontSize={14}
                    fontStyle="normal"
                    fontWeight={500}
                    lineHeight={1.42}
                    fontFamily={montserrat.style.fontFamily}
                    style={{
                      color: "rgba(31, 31, 32, 0.70)",
                      margin: 8,
                    }}
                  >
                    Arrastre su Documento de Copia Maestra o haga{" "}
                    <span
                      style={{
                        color: "#00B2E2",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      click aquí
                    </span>{" "}
                    y selecciónalo desde su ordenador.
                  </Typography>
                  <Typography
                    width={510}
                    textAlign="center"
                    fontSize={14}
                    fontStyle="normal"
                    lineHeight={1.42}
                    style={{
                      color: "rgba(31, 31, 32, 0.40)",
                    }}
                  >
                    Documentos en Formato PDF
                  </Typography>
                </div>
              )}
              {file && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/imagenPDF.png"
                      loading="lazy"
                      width="30"
                      height="30"
                    />
                    <Typography
                      textAlign="center"
                      fontSize={16}
                      fontStyle="normal"
                      fontFamily={montserrat.style.fontFamily}
                      lineHeight={1.42}
                      style={{
                        cursor: "pointer",
                        padding: 16,
                      }}
                    >
                      {file?.name}
                    </Typography>
                  </Box>
                  <Typography
                    textAlign="center"
                    fontSize={14}
                    fontStyle="normal"
                    lineHeight={1.42}
                    style={{
                      color: "#00B2E2",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: 16,
                    }}
                  >
                    Volver a Cargar Archivo...
                  </Typography>
                </Box>
              )}
            </StyleddropZone>
          </Box>
          <StyledContainerButtons width={"100%"}>
            <StyledCancelButton
              variant="outlined"
              style={{
                fontSize: 14,
                textTransform: "none",
                height: 49,
                width: 121,
                fontFamily: montserrat.style.fontFamily,
                marginRight: 16,
                borderRadius: 8,
              }}
              onClick={onClose}
            >
              Cancelar
            </StyledCancelButton>
            <StyledConfirmButton
              variant="contained"
              style={{
                background: "#00B2E2",
                color: "white",
                fontSize: 14,
                textTransform: "none",
                height: 48,
                width: 160,
                fontFamily: montserrat.style.fontFamily,
                borderRadius: 8,
              }}
              onClick={onConfirm}
            >
              Adjuntar Archivo
            </StyledConfirmButton>
          </StyledContainerButtons>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddFileModal;
