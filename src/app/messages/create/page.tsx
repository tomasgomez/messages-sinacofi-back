"use client"
import AddFileModal from "@/app/component/modal-add-file";
import { useAppContext } from "@/app/context";
import { createMessage, getMessageDetails, getMessageSchema, signMessage } from "@/app/services/common";
import Form from "@/components/Form";
import { useModalManager } from "@/components/Modal";
import { Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { SessionProviderContext } from "@/context/SessionProvider";
const statusCodes = ["01", "05", "pending"];
const payloadDefault: string[] = [
  "messageCode",
  "priority",
  "status",
  "origin",
  "destination",
  "parameters"
];

const getCreateMessagePayload = (data: any, schema: any, origin: any, userInfo: any) => {
  const payload: { [key: string]: any } = {};
   
  payloadDefault.forEach((param: string) => {
    payload[param] = data[param];
  });
  payload.origin = origin;
  payload.destination = data.beneficiaryBank
  payload.parameters = Object.entries(data)
    // .filter((el: any) => payload[el[0]] === undefined)
    .map((el) => {
      return {
        name: el[0],
        label: schema?.parameters
          .filter((field: any) => field.type !== "label" && field.type !== "linebreak")
          .find((field: any) => field.name === el[0])?.label,
        value: (el[0] === "sign" && el[1]) ? userInfo.user?.name : el[1],
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
  const { userInfo } = useContext(SessionProviderContext) as any;
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
  const messageId = searchParams?.get("messageId") || "";
  const cukCode = searchParams?.get("cukCode") || "";
  useEffect(() => {
    setLoading(true);
    if(((cloneId || messageId) && !cukCode )) {
      getMessageDetails(cloneId || messageId).then((data) => {
        getMessageSchema(messageCode, messageId)
          .then((schema: any) => {
            setMessageSchema({
              ...schema,
              actions: { saveDraftDisabled: true, sendButtonDisabled: false },
              parameters: schema?.parameters.map((parameter: any) => (
                parameter.id.startsWith("beneficiaryBank")
                // parameter.id === "destination" 
                ? {
                  ...parameter,
                  selected: institutionId,
                  defaultValue: institutionId,
                  disabled: true
                } 
                : parameter.id === "bank" || parameter.id.startsWith("bank")
                // parameter.id === "destination" 
                ? {
                  ...parameter,
                  defaultValue: "BANCO",
                  disabled: true
                } 
                : parameter.id === "CUK" 
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
                    // defaultValue: data[0]?.priority,
                    defaultValue: "priorityNormal",
                    disabled: true
                  } 
                  // : { ...parameter, disabled: true }
                  : parameter.id === "sign"
                    ? {
                      ...parameter,
                      type: "password",
                      // label: parameter.label
                      required: true,
                      defaultValue: initializarField(parameter.id, data[0]?.parameters),
                      disabled: false
                    }
                    : {
                      ...parameter,
                      defaultValue: initializarField(parameter.id, data[0]?.parameters),
                      ...(parameter.type === "select" ? { selected: initializarField(parameter.id, data[0]?.parameters) }: {}),
                      disabled: true
                    }
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
      });
    } else {
      getMessageSchema(messageCode, messageId)
        .then((schema: any) => {
          setMessageSchema({
            ...schema,
            actions: { saveDraftDisabled: ["671", "672", "673", "674", "675"].includes(messageCode), sendButtonDisabled: messageCode === "670" },
            parameters: messageCode === "670" ? schema?.parameters.map((parameter: any) => (
              parameter.id.startsWith("beneficiaryBank")
              // parameter.id === "destination" 
              ? {
                ...parameter,
                selected: institutionId,
                defaultValue: institutionId,
                disabled: true
              } 
              : parameter.id === "bank" || parameter.id.startsWith("bank")
              // parameter.id === "destination" 
              ? {
                ...parameter,
                defaultValue: selectedInstitution,
                disabled: true
              } :
              parameter
             )) : messageCode === "675" ? schema?.parameters.map((parameter: any) => (
              parameter.type === "accordion" ?
                {
                  ...parameter,
                  open: parameter.label !== "Datos de Hipoteca" && parameter.label !== "Detalle Otros Créditos",
                  parameters: parameter?.parameters.map((parameter: any) => (
                    parameter.id === "bank" || parameter.id === "currentBank" || parameter.id.startsWith("bank")
                    ? {
                      ...parameter,
                      defaultValue: selectedInstitution,
                      disabled: true
                    } : 
                    parameter.id === "typeOfObligation"
                    ? {
                      ...parameter,
                      properties: {
                        ...parameter.properties,
                        options: [
                          {
                            label: "Credito Complementario",
                            value: "Credito Complementario",
                          }
                        ]
                      },
                      defaultValue: "Credito Complementario",
                    } : 
                     parameter.id === "typeOfDebt" ? {
                      ...parameter,
                      properties: {
                        ...parameter.properties,
                        options: [
                          {
                            label: "Directo",
                            value: "Directo",
                          }
                        ]
                      },
                      defaultValue: "Directo",
                    } : 
                     parameter.id === "typeOfCurrency" ? {
                      ...parameter,
                      properties: {
                        ...parameter.properties,
                        options: [
                          {
                            label: "UF",
                            value: "uf",
                          },
                          {
                            label: "Pesos $ -",
                            value: "pesos",
                          }
                        ]
                      },
                      defaultValue: "uf",
                    } : 
                     parameter.id === "typeOfCurrency_2" ? {
                      ...parameter,
                      properties: {
                        ...parameter.properties,
                        options: [
                          {
                            label: "UF",
                            value: "uf",
                          },
                          {
                            label: "Pesos $ -",
                            value: "pesos",
                          }
                        ]
                      },
                      defaultValue: "pesos",
                    } : 
                      parameter
                  )),
                }
                 : parameter
              )) : schema?.parameters
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
  }, [messageCode, institutionId, cloneId, messageId, selectedInstitution, cukCode]);

  const onSubmit = (data: any) => {
    const payload = getCreateMessagePayload(data, messageSchema, selectedInstitution, userInfo);

    if (messageCode === "670" || messageCode === "672") {
      onSignOpen({
        onConfirm: (document: any) => {
          onClose?.();
          setLoading(true);
          signMessage(messageId, statusCodes[1], { ...payload, documents: document })
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
    const payload = getCreateMessagePayload(data, messageSchema, selectedInstitution, userInfo);
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