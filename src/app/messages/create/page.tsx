"use client"
import { MyContexLayout } from "@/app/context";
import { createMessage, /* getMessageDetails, */ getMessageSchema } from "@/app/services/common";
import Dropdrown from "@/components/Dropdown";
import Field from "@/components/Field";
import Form from "@/components/Form";
import FormBuilder from "@/components/FormBuilder";
import Loader from "@/components/Loader";
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
const CreateMessage = () => {
  const { setModalState } = useContext(MyContexLayout) as any;
  const [messageSchema, setMessageSchema] = useState({parameters: []});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageCode = searchParams?.get("messageCode") || "";
  const institutionId = searchParams?.get("institutionId") || "";
  const cloneId = searchParams?.get("cloneId") || "";

  useEffect(() => {
    setLoading(true);
    // /* getMessageDetails( */cloneId).then(() => {

    // })
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
  }, [messageCode, institutionId]);

  const onSubmit = (data: any) => {
    setLoading(true);
    const payload = getCreateMessagePayload(data, messageSchema);
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
      />
    </Container>
  );
};

export default CreateMessage;