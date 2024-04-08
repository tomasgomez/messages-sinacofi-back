import { CloseRounded, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, IconButton, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../Loader";
import FormBuilder from "../FormBuilder";
import { useEffect } from "react";


const getDefaultValues = (schema: any) => {
  const defaultValues: { [key: string]: any } = {};
  schema?.parameters.forEach((parameter: { defaultValue: any, name: string }) => {
    defaultValues[parameter.name] = parameter.defaultValue;
  });
  console.log({ defaultValues });
  return defaultValues;
};

const Form = ({
  children,
  title,
  onBack,
  schema,
  loading,
  onSubmit,
}: {
  children?: any;
  title: string;
  onBack?: any;
  schema?: any;
  loading?: boolean;
  onSubmit: any;
}) => {
  const { handleSubmit, register, control, reset, formState: { errors } } = useForm({
    defaultValues: getDefaultValues(schema),
  });
  
  // const onSubmit: SubmitHandler<{}> = (data: any) => console.log(data)

  useEffect(() => {
    reset(getDefaultValues(schema))
  }, [schema, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
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
              {title}
            </Typography>
            <IconButton onClick={onBack}>
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
              !schema?.parameters ? (
                <Box minHeight={420} justifyContent="center" width="100%" display="flex" alignItems="center">
                  Formulario de message no encontrado. 
                </Box>
              ) : (
                <FormBuilder schema={schema} register={register} control={control} errors={errors} />
                // <>
                //   <Grid container spacing={2}>
                //     {messageSchema?.parameters?.map((field: any) => {
                //         return (
                //           <Grid item xs={field.properties.columns}>
                //             <FieldSelector type={field.type} props={{...field.properties, ...field }} />
                //             {/* // <Field
                //             //   {...field.properties}
                //             //   label={field.label}
                //             //   placeholder={field.placeholder}
                //             //   defaultValue={field.defaultValue}
                //             //   disabled={field.properties.disabled}
                //             // /> */}
                //           </Grid>
                //         );
                //       })
                //     }
                //   </Grid>
                //   <Typography variant="body2" marginTop="12px" sx={{ color: "#565656" }}>
                //     * Campos obligatorios del mensaje
                //   </Typography>
                // </>
              )
            )}
          </CardContent>
        </Card>
        {schema?.parameters && !loading && (
          <Stack direction="row" justifyContent="space-between" gap="12px">
            <Stack direction="row" justifyContent="flex-start" gap="24px" mt="24px">
              <Button variant="contained" /* onClick={onClose} */ color="primary" type="submit">
                Enviar
              </Button>
              <Button variant="outlined" /* onClick={onSubmit} */>
                Grabar en Preparados
              </Button>
            </Stack>
            <Box marginTop="14px">
              <IconButton onClick={onBack}>
                <DeleteOutlineOutlined />
              </IconButton>
            </Box>
          </Stack>
        )}
      {children}
    </form>
  );
};

export default Form;