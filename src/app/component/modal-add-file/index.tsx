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

const AddFileModal = ({
  open = false,
  onClose = () => null,
  onConfirm = () => null,
}: {
  open: boolean;
  onClose: any;
  onConfirm: any;
}) => {
  const [step, setStep] = useState<number>(0);
  const [tempFile, setTempFile] = useState<any>(null);
  const [cmFile, setCmFile] = useState<any>(null);
  const [gpFile, setGpFile] = useState<any>(null);

  console.log('# file', tempFile);
  console.log('# cmFile', cmFile);
  console.log('# cmFile', gpFile);

  const fileOrder = [
    {file: 'Copia Maestra', type: 'CM'},
    {file: 'GP', type: 'GP'}
  ]

  const handleFileChange = (event: any) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if(step === 0 ){
        setTempFile(selectedFile);
        setCmFile(selectedFile);
      } else {
        setTempFile(selectedFile);
        setGpFile(selectedFile);
      }
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if( step === 0 ){
      setTempFile(selectedFile);
      setCmFile(selectedFile);
    } else {
      setTempFile(selectedFile);
      setGpFile(selectedFile);
    }
  };

  const handleNextStep = () => {
    setStep(1)
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
          style={{ padding: "16px 16px 32px 0px"}}
        >
          Carga de {fileOrder[step].file}
        </Typography>
        <StepStatusContainer>
          <FileStatusStepContainer>
            {step ?
              <StyledContainerIcon status="#00BC701A">
                <StyledCheckIcon />
              </StyledContainerIcon>
              : 
              <StyledContainerIcon status="#fff" border="#00B2E2">
                <StyledUploadIcon />
              </StyledContainerIcon>
            }
            <FileStatusStep>Cargar CM</FileStatusStep>
          </FileStatusStepContainer>
          - - -
          <FileStatusStepContainer>
            {step ? 
              <StyledContainerIcon status="#fff" border="#00B2E2">
                <StyledUploadIcon />
              </StyledContainerIcon> 
              :
              <StyledNextStep />
            }
            <FileStatusStep>Cargar GP</FileStatusStep>
          </FileStatusStepContainer>
        </StepStatusContainer>
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
            {step === 0 ?
              <StyledConfirmButton variant="contained" disabled={!tempFile} onClick={handleNextStep}>
                Siguiente
              </StyledConfirmButton>
            :
              <StyledConfirmButton variant="contained" disabled={!tempFile} onClick={() => onConfirm(tempFile)}>
                Cargar y Finalizar
              </StyledConfirmButton>
            }
          </StyledContainerButtons>
        </StyledContentBody>
      </Modal>
    </Box>
  );
};

export default AddFileModal;
