import { useState } from "react";
import { Modal } from "../Modal";
import { Button, Grid, Stack } from "@mui/material";
import Field from "../Field";
import { useRouter } from "next/navigation";
import InstitutionDropdown from "../FieldTypes/InstitutionDropdown";
import MessageTypesDropdown from "../FieldTypes/MessageDescriptionDropdown";

const CreateIndividualMessageModal = ({ open, onClose } : { open: boolean; onClose: any }) => {
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [messageCode, setMessageCode] = useState(null);
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nuevo Mensaje Individual "
      maxWidth="698px"
    >
      <Grid container spacing={2} mb={3}>
        <Grid item xs={3}>
          <Field
            value={messageCode}
            placeholder="-"
            label="Código"
            onChange={(value: any) => {
              setMessageCode(value)
            }}
            focused={!!messageCode}
          />
        </Grid>
        <Grid item xs={9}>
          <MessageTypesDropdown
            label="Descripción"
            placeholder="Seleccione el tipo de mensaje"
            value={messageCode}
            onChange={(value: any) => {
              setMessageCode(value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InstitutionDropdown
            label="Institución Destino"
            placeholder="Seleccione Institución Destino"
            onChange={(value: any) => {
              setSelectedInstitution(value);
            }}
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            router.push(`/messages/create?messageCode=${messageCode}&institutionId=${selectedInstitution}`);
            onClose();
          }}
          disabled={!messageCode || !selectedInstitution}
        >
          Crear Mensaje
        </Button>
      </Stack>
    </Modal>
  );
};

export default CreateIndividualMessageModal;