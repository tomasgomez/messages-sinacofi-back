"use client"
import { createMessage, getMessageSchema } from "@/app/services/common";
import Dropdrown from "@/components/Dropdown";
import Field from "@/components/Field";
import Form from "@/components/Form";
import FormBuilder from "@/components/FormBuilder";
import Loader from "@/components/Loader";
import { CloseRounded, DeleteOutlineOutlined, Remove, RemoveOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const defaultPayload = {

}
const statusCodes = ["01", "05", "pending"]
const payloadDefault: string[] = [
  "messageCode",
  "priority",
  "status",
  "sender",
  "receiver",
  "parameters"
]

const getCreateMessagePayload = (data: any, schema: any) => {
  const payload: { [key: string]: any } = {};
   
  payloadDefault.forEach((param: string) => {
    payload[param] = data[param];
  });
  // const filteredData = Object.entries(data).filter((el: any) => el.name === )
  payload.parameters = Object.entries(data)
    .filter((el: any) => payload[el[0]] === undefined)
    .map((el) => {
      console.log({ el })
      return {
        name: el[0],
        label: schema?.parameters.find((field: any) => field.name === el[0]).label,
        value: el[1],
      }
    });
  return payload;
}
const CreateMessage = () => {
  const [messageSchema, setMessageSchema] = useState({parameters: []});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageCode = searchParams?.get("messageCode") || "";
  const institutionId = searchParams?.get("institutionId") || "";

  useEffect(() => {
    setLoading(true);
    getMessageSchema(messageCode, institutionId)
      .then((schema: any) => {
        setMessageSchema({
          ...schema,
          parameters: schema?.parameters.map((parameter: any) => (
            parameter.id === "institutionDestination" 
            ? { ...parameter, defaultValue: institutionId } 
            : parameter.id === "codeField"
              ? { ...parameter, defaultValue: messageCode } 
              : parameter
          ))
        });
        setLoading(false);
      });
  }, [messageCode, institutionId]);

  const onSubmit = (data: any) => {
    const payload = getCreateMessagePayload(data, messageSchema);
    payload.status = "05";
    router.push("/sent");
    console.log({data, payload})
    createMessage(payload).then((response: any) => console.log({ response }));
    
  };
  const onPrepare = (data: any) => {
    const payload = getCreateMessagePayload(data, messageSchema);
    payload.status = "01";
    router.push("/prepared");
    console.log({data, payload})
    createMessage(payload).then((response: any) => console.log({ response }));
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
        onSubmit={onSubmit}
        onPrepare={onPrepare}
      />
    </Container>
  );
};

export default CreateMessage;