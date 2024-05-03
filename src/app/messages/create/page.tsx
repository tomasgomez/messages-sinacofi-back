"use client"
import AddFileModal from "@/app/component/modal-add-file";
import { MyContexLayout } from "@/app/context";
import { createMessage, getMessageDetails, /* getMessageDetails, */ getMessageSchema, updateMessage } from "@/app/services/common";
import Dropdrown from "@/components/Dropdown";
import Field from "@/components/Field";
import Form from "@/components/Form";
import FormBuilder from "@/components/FormBuilder";
import Loader from "@/components/Loader";
import { useModalManager } from "@/components/Modal";
import { CloseRounded, DeleteOutlineOutlined, Remove, RemoveOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const defaultPayload = {

}
const statusCodes = ["01", "05", "pending"];
const payloadDefault: string[] = [
  "messageCode",
  "priority",
  "status",
  "sender",
  "receiver",
  "parameters"
];

const getCreateMessagePayload = (data: any, schema: any) => {
  const payload: { [key: string]: any } = {};
   
  payloadDefault.forEach((param: string) => {
    payload[param] = data[param];
  });
  payload.sender = "CORP BANCA"
  // const filteredData = Object.entries(data).filter((el: any) => el.name === )
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
  const { setModalState } = useContext(MyContexLayout) as any;
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
        getMessageSchema(messageCode, institutionId)
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
      getMessageSchema(messageCode, institutionId)
        .then((schema: any) => {
          setMessageSchema({
            ...schema,
            parameters: schema?.parameters.map((parameter: any) => (
              parameter.id === "receiver" 
              ? { ...parameter, selected: institutionId, defaultValue: institutionId } 
              : parameter.id === "messageCode"
                ? { ...parameter, defaultValue: messageCode } 
                : parameter
            ))
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
  }, [messageCode, institutionId, cloneId, signMessageId]);

  const onSubmit = (data: any) => {
    const payload = getCreateMessagePayload(data, messageSchema);
    if (true) {
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
    setLoading(true);
    const payload = getCreateMessagePayload(data, messageSchema);
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
            disabled: messageSchema.actions?.sendButtonDisabled,
          },
          prepared: {
            onClick: onPrepare,
            disabled: messageSchema.actions?.saveDraftDisabled,
          }
        }}
      />
    </Container>
  );
};

export default CreateMessage;