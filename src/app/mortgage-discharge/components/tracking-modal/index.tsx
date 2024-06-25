import { Modal } from "@/app/component/Modal/Modal";
import { montserrat } from "@/utils/fonts";
import { CloseRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
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
import { sortHistoryList } from "@/utils/mortgage-discharge-utils";
import { SessionProviderContext } from "@/context/SessionProvider";
import {
  HistoryTrackingModal,
  MortgageDischargeData,
} from "@/app/component/inbox-table/type";
import { useModalManager } from "@/components/Modal";
import basicError from "@/components/Modal/ErrorModal/basicError";
import { MyContexLayout } from "@/app/context";
import { MortgageDischargeContext } from "../store/ModalStore";

export const TrackingModal = (props: { handleGetDataList?: () => void }) => {
  const {
    isOpenTrackingModal,
    setIsOpenTrackingModal,
    modalTrackingData,
    setModalTrackingData,
  } = useContext(MortgageDischargeContext);

  const [statusSelected, setStatusSelected] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<HistoryTrackingModal[]>([]);
  const [dataOptions, setDataOptions] = useState<unknown[]>([]);

  const { selectedInstitution } = useContext(MyContexLayout) as any;
  const { ErrorModal } = useModalManager();

  const { handleGetDataList = () => null } = props || {};

  const {
    cukCode = "",
    history = [],
    institutionDestination = "",
    lastMessage,
    ...restOfData
  } = modalTrackingData || {};

  const { userInfo } = useContext(SessionProviderContext);

  const handleClose = () => {
    setIsOpenTrackingModal(false);
    setModalTrackingData(null);
    handleGetDataList();
  };

  useEffect(() => {
    if (history) {
      setHistoryList(history);
      setDataOptions(EnabledExtraOptions(options, history));
    }
  }, [isOpenTrackingModal]);

  const handleChange = async () => {
    try {
      setLoading(true);
      const newCuk: MortgageDischargeData = await updateForeClosureMessage(
        cukCode,
        statusSelected
      );

      const newHistory = sortHistoryList(
        newCuk?.history
      ) as HistoryTrackingModal[];

      setDataOptions(EnabledExtraOptions(options, newHistory));
      setHistoryList(newHistory);
      setLoading(false);
    } catch (error: unknown) {
      ErrorModal.open(basicError(error));
    }
  };

  const getTextTooltip = () => {
    if (loading) return "Cargando...";

    if (selectedInstitution !== institutionDestination)
      return "Solo la institución destino puede cambiar el estado de la base de seguimiento";

    if (dataOptions.every((elem: any) => elem?.disabled))
      return "No hay más opciones de cambio de estado";

    if (!statusSelected) return "Seleccione un estado";

    if (
      statusSelected === "022" &&
      !userInfo?.permissions.acceptMortgageDischarge
    )
      return "No tienes permiso para aceptar el alzamiento hipotecario";

    if (
      statusSelected === "023" &&
      !userInfo?.permissions.rejectMortgageDischarge
    )
      return "No tienes permiso para rechazar el alzamiento hipotecario";

    if (
      historyList[0]?.status === "XXX" &&
      (lastMessage?.messageCode !== "673" || !(lastMessage?.status === "05"))
    )
      return "Debe enviar primero el mensaje de normalización para poder finalizarlo";

    return "";
  };

  return (
    <Modal
      sx={{
        color: "black",
        p: "40px",
        maxWidth: "960px",
        height: "678px",
        top: "calc((100% - 678px)/2)",
        margin: 0,
      }}
      open={isOpenTrackingModal}
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
            disabled={selectedInstitution !== institutionDestination}
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
        <Tooltip title={getTextTooltip()}>
          <span>
            <Button
              sx={buttonUpdateStateSecondarySx}
              onClick={handleChange}
              variant="contained"
              disabled={
                loading ||
                !statusSelected ||
                // if you aren't the institution Destination you can change the status
                selectedInstitution !== institutionDestination ||
                (statusSelected == "022" &&
                  !userInfo?.permissions.acceptMortgageDischarge) ||
                (statusSelected == "023" &&
                  !userInfo?.permissions.rejectMortgageDischarge) ||
                // If the last history is 'XXX' (normalization), then the last message must be 673 and have a status of 05.
                (historyList[0]?.status === "XXX" &&
                  (lastMessage?.messageCode !== "673" ||
                    !(lastMessage?.status === "05")))
              }
            >
              Actualizar Estado
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Modal>
  );
};
