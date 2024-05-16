import { Modal } from "@/components/Modal/Modal"
import { CloseRounded } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton/IconButton"
import Typography from "@mui/material/Typography/Typography"
import { PDFViewer } from "@react-pdf/renderer"
import { PDFTemplate } from "../PDFTemplate"
import { useContext } from "react"
import { MessageExportContext } from "../MessageExportProvider"
import { montserrat } from "@/utils/fonts"
import Loader from "@/components/Loader"



export const ModalPrint = () => {
    const { printPDF, setPrintPDF,isLoading, details } = useContext(MessageExportContext);

    const handleClose = () => {
        setPrintPDF(false);
    };

    return (  
      <Modal sx={{
        color: 'black',
        p: "40px",
        maxWidth: "960px",
    }} open={printPDF} onClose={handleClose}>
        <Typography variant="h6" fontWeight={700} fontFamily={montserrat.style.fontFamily} mb={3}fontSize={16}>
            Previsualización de impresión
        </Typography>
        {isLoading ? <Loader label="Cargando detalles..."/>: (
            <PDFViewer width="100%" height='450px'>
                <PDFTemplate data={details}/>
            </PDFViewer>
        )}
      </Modal>
    )
  }