import { Typography } from "@mui/material";
import ParamenterListBuilder from "./ParametersBuilder";


const FormBuilder = ({ /* children, */ parameters, register, control, errors,  }: { /* children: any, */ parameters: any, register: any, control: any, errors: any }) => {
  // const { handleSubmit, register, control } = useForm({
  //   defaultValues: getDefaultValues(schema),
  //   // defaultValues: {
  //   //   freeText: "HOLA"
  //   // }
  // });
  // const onSubmit: SubmitHandler<{}> = (data: any) => console.log(data)
  // console.log({ errors, schema });
  return (
    <>
      <ParamenterListBuilder parameters={parameters} register={register} control={control} errors={errors} />
      {errors.borrowerUfAmount?.message !== "" && (
        <Typography variant="body2" marginTop="12px" sx={{ color: Object.entries(errors || {}).length ? "red" : "#565656" }}>
          {errors.borrowerUfAmount?.message}
        </Typography>
      )}
      {errors.phoneNumber?.type === "pattern" && (
        <Typography variant="body2" marginTop="12px" sx={{ color: Object.entries(errors || {}).length ? "red" : "#565656" }}>
          * Debe ingresar un número telefonico válido
        </Typography>
      )}
      <Typography variant="body2" marginTop="12px" sx={{ color: Object.entries(errors || {}).length ? "red" : "#565656" }}>
        * Campos obligatorios del mensaje
      </Typography>
      {/* <button type="submit">Submit</button> */}
    </>
  );
};

export default FormBuilder;
