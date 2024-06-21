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
  StyledContentHeader,
  FileStatusStep,
  StepStatusContainer,
  StyledCheckIcon,
  StyledContainerIcon,
  FileStatusStepContainer,
  StyledNextStep,
  StyledUploadIcon,
} from "./styled";
import Image from "next/image";

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const result = reader.result;

      if (typeof result === "string") {
        const base64String = result.split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Unexpected result type"));
      }
    };

    reader.onerror = function () {
      reject(reader.error);
    };

    reader.readAsDataURL(blob);
  });
};

const AddFileModal = ({
  open = false,
  onClose = () => null,
  onConfirm = () => null,
  isRejected = false,
}: {
  open: boolean;
  onClose: any;
  onConfirm: any;
  isRejected?: boolean;
}) => {
  const [step, setStep] = useState<number>(0);
  const [tempFile, setTempFile] = useState<any>(null);
  const [cmFile, setCmFile] = useState<any>(null);
  const [gpFile, setGpFile] = useState<any>(null);

  const fileOrder = [
    { file: "Copia Maestra", type: "CM" },
    { file: "GP", type: "GP" },
  ];

  const handleFileChange = async (event: any) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setTempFile(selectedFile);
      const base64 = await blobToBase64(selectedFile);
      const document = {
        content: base64,
        documentName: isRejected
          ? "R-" + selectedFile.name
          : fileOrder[step].type + "-" + selectedFile.name,
      };
      if (step === 0) {
        setCmFile(document);
      } else {
        setGpFile(document);
      }
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (step === 0) {
      setTempFile(selectedFile);
      setCmFile(selectedFile);
    } else {
      setTempFile(selectedFile);
      setGpFile(selectedFile);
    }
  };

  const handleNextStep = () => {
    setStep(1);
    setTempFile(null);
  };

  return (
    <Box>
      <Modal maxWidth={698} open={open} onClose={onClose}>
        <StyledContentHeader>
          <Typography
            fontFamily={montserrat.style.fontFamily}
            fontSize={20}
            fontWeight="bold"
            style={{ padding: "16px 16px 32px 0px" }}
          >
            {isRejected
              ? "Carga de Reparo Escritura AH"
              : `Carga de ${fileOrder[step].file}`}
          </Typography>
          {!isRejected && (
            <StepStatusContainer>
              <FileStatusStepContainer>
                {step ? (
                  <StyledContainerIcon status="#00BC701A">
                    <StyledCheckIcon />
                  </StyledContainerIcon>
                ) : (
                  <StyledContainerIcon status="#fff" border="#00B2E2">
                    <StyledUploadIcon />
                  </StyledContainerIcon>
                )}
                <FileStatusStep>Cargar CM</FileStatusStep>
              </FileStatusStepContainer>
              - - -
              <FileStatusStepContainer>
                {step ? (
                  <StyledContainerIcon status="#fff" border="#00B2E2">
                    <StyledUploadIcon />
                  </StyledContainerIcon>
                ) : (
                  <StyledNextStep />
                )}
                <FileStatusStep>Cargar GP</FileStatusStep>
              </FileStatusStepContainer>
            </StepStatusContainer>
          )}
        </StyledContentHeader>
        <StyledContentBody>
          <Box>
            <StyleddropZone onDragOver={handleDragOver} onDrop={handleDrop}>
              <StyledInput
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                multiple
              />
              {!tempFile && (
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
                    Arrastre su Documento de {fileOrder[step].file} o haga{" "}
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
              {tempFile && (
                <StyledCenterBoxColumn>
                  <StyledCenterBoxRow>
                    <Image
                      src="/imagenPDF.png"
                      alt="pdf-image.png"
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
                      {tempFile?.name}
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
            {step === 0 && !isRejected ? (
              <StyledConfirmButton
                variant="contained"
                disabled={!tempFile}
                onClick={handleNextStep}
              >
                Siguiente
              </StyledConfirmButton>
            ) : (
              <StyledConfirmButton
                variant="contained"
                disabled={!tempFile}
                onClick={() =>
                  isRejected ? onConfirm([cmFile]) : onConfirm([cmFile, gpFile])
                }
              >
                Cargar y Finalizar
              </StyledConfirmButton>
            )}
          </StyledContainerButtons>
        </StyledContentBody>
      </Modal>
    </Box>
  );
};

export default AddFileModal;
