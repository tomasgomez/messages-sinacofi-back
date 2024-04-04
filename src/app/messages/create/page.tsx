"use client"
import { getMessageSchema } from "@/app/services/common";
import Dropdrown from "@/components/Dropdown";
import Field from "@/components/Field";
import Loader from "@/components/Loader";
import { CloseRounded, DeleteOutlineOutlined, Remove, RemoveOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FieldTypes = {
  textField: Field,
  select: Dropdrown,
  textArea: Field,
}

const FieldSelector = ({ type, props }: { type: any, props: any }) => {
  const FieldGotten = FieldTypes[type as keyof typeof FieldTypes] || FieldTypes.textField;
  return (
    <FieldGotten {...props} />
  );
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
        setMessageSchema(schema);
        setLoading(false);
      });
  }, [messageCode, institutionId]);

  return (
    <Container
      sx={{
        width: "calc(100vw - 270px)",
        maxWidth: "calc(100vw ) !important",
        marginTop: "22px"
      }} /* maxWidth={"100vw"} */
    >
      <Card>
        <Container
          sx={{
            color: "#ffffff",
            borderRadius: "4px 4px 0px 0px",
            backgroundColor: "#0C2093",
            width: "100%",
            height: "38px",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "calc(100vw ) !important",
            paddingRight: "14px !important",
          }}
        >
          <Typography variant="subtitle1">
            Nuevo Mensaje
          </Typography>
          <IconButton onClick={router.back}>
            <CloseRounded style={{ color: "#ffffff" }} />
          </IconButton>
        </Container>
        <CardContent
          sx={{
            padding: "20px",
          }}
        >
          {loading ? (
            <Loader minHeight="400px"/>
          ) : (
            !messageSchema?.parameters ? (
              <Box minHeight={420} justifyContent="center" width="100%" display="flex" alignItems="center">
                Formulario de message no encontrado. 
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {messageSchema?.parameters?.map((field: any) => {
                      return (
                        <Grid item xs={field.properties.columns} key={field.name}>
                          <FieldSelector type={field.type} props={{...field.properties, ...field }} />
                          {/* // <Field
                          //   {...field.properties}
                          //   label={field.label}
                          //   placeholder={field.placeholder}
                          //   defaultValue={field.defaultValue}
                          //   disabled={field.properties.disabled}
                          // /> */}
                        </Grid>
                      );
                    })
                  }
                </Grid>
                <Typography variant="body2" marginTop="12px" sx={{ color: "#565656" }}>
                  * Campos obligatorios del mensaje
                </Typography>
              </>
            )
          )}
        </CardContent>
      </Card>
      {messageSchema?.parameters && !loading && (
        <Stack direction="row" justifyContent="space-between" gap="12px">
          <Stack direction="row" justifyContent="flex-start" gap="24px" mt="24px">
            <Button variant="contained" /* onClick={onClose} */ color="primary">
              Enviar
            </Button>
            <Button variant="outlined" /* onClick={onSubmit} */>
              Grabar en Preparados
            </Button>
          </Stack>
          <Box marginTop="14px">
            <IconButton>
              <DeleteOutlineOutlined />
            </IconButton>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default CreateMessage;