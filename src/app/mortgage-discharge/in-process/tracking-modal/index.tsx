import { Modal } from "@/app/component/Modal/Modal";
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { CardDetails } from "./components/card-details";
import { CardStatusUpdate } from "./components/card-status-update";
import { MortgageStatusDropdown } from "./components/dropdown-mortgage-status";
import { buttonUpdateStateSecondarySx, buttonUpdateStateSx } from "./styles";
import { ModalTrackingData } from "@/types/mortgage-discharge";
import { useEffect, useState, useContext } from "react";
import { updateForeClosureMessage } from "../../api-calls";
import { options } from "./constants";
import { EnabledExtraOptions } from "@/utils/tracking-modal";
import { sortHistoryList } from "@/utils/mortgage-discharge";
import { SessionProviderContext } from "@/context/SessionProvider";

export const TrackingModal = (props: {
  open: boolean;
  onClose: (state: boolean) => void;
  data: ModalTrackingData | undefined;
  handleGetDataList: () => void;
  setLoading: (state: boolean) => void;
  selectedInstitution: string;
}) => {
  const [statusSelected, setStatusSelected] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [dataOptions, setDataOptions] = useState<any[]>([]);

  const { open, onClose, data, handleGetDataList, selectedInstitution } = props;
  const { cukCode, history, institutionDestination, ...restOfData } =
    data || {};

  const { userInfo } = useContext(SessionProviderContext);

  const handleClose = () => {
    onClose(false);
    handleGetDataList();
  };

  useEffect(() => {
    if (history) {
      setHistoryList(history || []);
      setDataOptions(EnabledExtraOptions(options, history || []));
    }
  }, [history]);

  const handleChange = async () => {
    setLoading(true);
    const newCuk = await updateForeClosureMessage(cukCode, statusSelected);
    const newHistory = sortHistoryList(JSON.parse(newCuk?.history));
    setDataOptions(EnabledExtraOptions(options, newHistory));
    setHistoryList(newHistory);
    setLoading(false);
  };

  return (
    <Modal
      sx={{ color: "black", p: "40px", maxWidth: "960px" }}
      open={open}
      onClose={handleClose}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: "10px", top: "10px" }}
      >
        <CloseRounded />
      </IconButton>
      <Typography variant="body1" fontWeight={400}>
        {cukCode}
      </Typography>
      <Typography
        variant="h6"
        fontWeight={700}
        fontFamily={montserrat.style.fontFamily}
        mb="20px"
        fontSize={20}
      >
        Base de Seguimiento Alzamiento Hipotecario
      </Typography>
      <Box display="flex" gap="20px">
        <CardDetails data={restOfData} />
        <CardStatusUpdate data={historyList} loading={loading} />
      </Box>
      <Box display="flex" my="28px">
        <Box flex={1}>
          <Typography
            variant="body1"
            fontWeight={500}
            fontFamily={montserrat.style.fontFamily}
            fontSize={16}
          >
            Estado Alzamiento Hipotecario
          </Typography>
          <Typography
            variant="caption"
            fontWeight={400}
            fontFamily={montserrat.style.fontFamily}
            fontSize={14}
          >
            Actualizar el estado de la operación AH
          </Typography>
        </Box>
        <Box>
          <MortgageStatusDropdown
            value={statusSelected}
            onChange={setStatusSelected}
            options={dataOptions}
            // disabled={selectedInstitution !== institutionDestination}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="end" gap="12px">
        <Button
          sx={buttonUpdateStateSx}
          onClick={handleClose}
          variant="outlined"
        >
          Cerrar
        </Button>
        <Button
          sx={buttonUpdateStateSecondarySx}
          onClick={handleChange}
          variant="contained"
          // disabled={
          //   loading ||
          //   !statusSelected ||
          //   // if you aren't the institution Destination you can change the status
          //   selectedInstitution !== institutionDestination ||
          //   (statusSelected == "022" &&
          //     !userInfo?.permissions.acceptMortgageDischarge) ||
          //   (statusSelected == "023" &&
          //     !userInfo?.permissions.rejectMortgageDischarge)
          // }
        >
          Actualizar Estado
        </Button>
      </Box>
    </Modal>
  );
};
