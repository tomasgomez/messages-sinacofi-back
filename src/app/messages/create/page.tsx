"use client"
import AddFileModal from "@/app/component/modal-add-file";
import { useAppContext } from "@/app/context";
import { createMessage, getMessageDetails, /* getMessageDetails, */ getMessageSchema, updateMessage } from "@/app/services/common";
import Form from "@/components/Form";
import { useModalManager } from "@/components/Modal";
import { Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const statusCodes = ["01", "05", "pending"];
const payloadDefault: string[] = [
  "messageCode",
  "priority",
  "status",
  "sender",
  "receiver",
  "parameters"
];

const getCreateMessagePayload = (data: any, schema: any, sender: any) => {
  const payload: { [key: string]: any } = {};
   
  payloadDefault.forEach((param: string) => {
    payload[param] = data[param];
  });
  payload.sender = sender;
  payload.receiver = data.beneficiaryBank
  payload.parameters = Object.entries(data)
    .filter((el: any) => payload[el[0]] === undefined)
    .map((el) => {
      console.log({ el })
      return {
        name: el[0],
        label: schema?.parameters
          .filter((field: any) => field.type !== "label" && field.type !== "linebreak")
          .find((field: any) => field.name === el[0])?.label,
        value: el[1],
      }
    });
  return payload;
}

const initializarField = (fieldName: string, fieldList: [{ value: any }]) => {
  const currentField = fieldList?.find((field: any) => fieldName === field.name);
  if (fieldName === "sign" && currentField?.value === "-"){
    return "";
  }
  return currentField?.value || null;

}
const CreateMessage = () => {
  const { setModalState, selectedInstitution } = useAppContext();
  const { onOpen: onSignOpen, onClose } = useModalManager({
    component: AddFileModal
  });
  const [messageSchema, setMessageSchema] = useState({parameters: [], actions: { saveDraftDisabled: false, sendButtonDisabled: false }});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageCode = searchParams?.get("messageCode") || "";
  const institutionId = searchParams?.get("institutionId") || "";
  const cloneId = searchParams?.get("cloneId") || "";
  const signMessageId = searchParams?.get("signMessageId") || "";

  useEffect(() => {
    setLoading(true);
    if(cloneId || signMessageId) {
      getMessageDetails(cloneId || signMessageId).then((data) => {
        console.log({ data });
        getMessageSchema(messageCode, selectedInstitution, institutionId)
          .then((schema: any) => {
            setMessageSchema({
              ...schema,
              actions: { saveDraftDisabled: true, sendButtonDisabled: false },
              parameters: schema?.parameters.map((parameter: any) => (
                parameter.id === "receiver" 
                ? {
                  ...parameter,
                  selected: institutionId,
                  defaultValue: institutionId,
                  disabled: true
                } 
                : parameter.id === "cukCode" 
                ? {
                  ...parameter,
                  defaultValue: data[0]?.cukCode,
                  disabled: true
                } 
                : parameter.id === "messageCode"
                  ? {
                    ...parameter,
                    defaultValue: messageCode,
                    disabled: true
                  } 
                : parameter.id === "priority"
                  ? {
                    ...parameter,
                    defaultValue: data[0]?.priority,
                    disabled: true
                  } 
                  // : { ...parameter, disabled: true }
                  : parameter.id === "sign"
                    ? {
                      ...parameter,
                      type: "password",
                      defaultValue: initializarField(parameter.name, data[0]?.parameters),
                      disabled: false
                    }
                    : {
                      ...parameter,
                      defaultValue: initializarField(parameter.name, data[0]?.parameters),
                      ...(parameter.type === "select" ? { selected: initializarField(parameter.name, data[0]?.parameters) }: {}),
                      disabled: true
                    }
              )).filter((parameter: any) => parameter.id !== "cuk")
            });
          })
          .catch((error) => {
            console.log({ error });
            setError("El schema de formulario no fue encontrado");
          })
          .finally(() => {
            setLoading(false);
          });
      });
    } else {
      console.log({ selectedInstitution });
      getMessageSchema(messageCode, selectedInstitution, institutionId)
        .then((schema: any) => {
          setMessageSchema({
            ...schema,
            actions: { saveDraftDisabled: false, sendButtonDisabled: false },
            parameters: schema?.parameters
          });
        })
        .catch((error) => {
          console.log({ error });
          setError("El schema de formulario no fue encontrado");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [messageCode, institutionId, cloneId, signMessageId, selectedInstitution]);

  const onSubmit = (data: any) => {
    const payload = getCreateMessagePayload(data, messageSchema, selectedInstitution);

    if (signMessageId) {
      onSignOpen({
        onConfirm: (document: any) => {
          onClose?.();
          setLoading(true);
          updateMessage(signMessageId, "05", { ...payload, documents: [document] })
            .then((response) => {
              console.log("Mensaje actualizados!");
              setModalState({
                type: "success",
                title: "Firma de mensaje y carga de Copia Maestra/GP exitosa",
                body: (
                  <>
                    <Typography fontSize={14} fontWeight={400}>
                      Codigo Interno Asignado al nuevo Mensaje: {response?.cukCode}
                    </Typography>
                  </>
                ),
                isOpen: true,
                onConfirm: () => router.push("/mortgage-discharge/in-process"),
              });
            })
            .finally(() => {
              setLoading(false);
            });
          
        }
      });
      return ;
    }
    setLoading(true);
    createMessage(payload, "05")
      .then((response: any) => {
        setLoading(false);
        setModalState({
          type: "success",
          title: "Mensaje Enviado Exitosamente",
          body: (
            <>
              <Typography fontSize={14} fontWeight={400}>
                NSE: {response?.NSE || "-"}
              </Typography>
              <Typography fontSize={14} fontWeight={400}>
                Fecha: {response?.creationDate || "-"}
              </Typography>
              <Typography fontSize={14} fontWeight={400}>
                Hora: {response?.creationTime || "-"}
              </Typography>
            </>
          ),
          isOpen: true,
          onConfirm: () => router.push("/messages/sent"),
        });
      });
  };
  const onPrepare = (data: any) => {
    // setLoading(true);
    const payload = getCreateMessagePayload(data, messageSchema, selectedInstitution);
    createMessage(payload, "01")
      .then((response: any) => {
        setLoading(false);
        setModalState({
          type: "success",
          title: "Mensaje Grabado en Preparados Exitosamente",
          body: (
            <>
              <Typography fontSize={14} fontWeight={400}>
                TSN: {response?.TSN || "-"}
              </Typography>
              <Typography fontSize={14} fontWeight={400}>
                Fecha: {response?.creationDate || "-"}
              </Typography>
              <Typography fontSize={14} fontWeight={400}>
                Hora: {response?.creationTime || "-"}
              </Typography>
            </>
          ),
          isOpen: true,
          onConfirm: () => router.push("/messages/prepared"),
        });
      });
  };

  return (
    <Container
      sx={{
        width: "calc(100vw - 270px)",
        maxWidth: "calc(100vw ) !important",
        marginTop: "22px"
      }} /* maxWidth={"100vw"} */
    >
      <Form
        title="Nuevo Mensaje"
        onBack={router.back}
        loading={loading}
        schema={messageSchema}
        error={error}
        onSubmit={onSubmit}
        onPrepare={onPrepare}
        actions={{
          submit: {
            onClick: onSubmit,
            disabled: messageSchema?.actions?.sendButtonDisabled,
          },
          prepared: {
            onClick: onPrepare,
            disabled: messageSchema?.actions?.saveDraftDisabled,
          }
        }}
      />
    </Container>
  );
};

export default CreateMessage;