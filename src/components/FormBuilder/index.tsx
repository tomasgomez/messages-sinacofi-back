import { Grid, TextField, Typography, TextFieldProps, FormControl, InputAdornment, styled, Box } from "@mui/material";
import Dropdrown from "../Dropdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
  TextField: string
  MyCheckbox: boolean
}

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#E5E5E5",
    color: "#000000 !important",
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    backgroundColor: "#DFF8FF",
    color: "#565656 !important",
  },
  "& .MuiFormLabel-root": {
    color: "#565656 !important",
  },
});

type FieldProps = {
  control: any;
  name: string;
  props: any;
} & TextFieldProps

const Field = ({
  // label,
  // name,
  control,
  ...props
}: FieldProps) => {
  // console.log({ name });
  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   // rules={{ required: true }}
    //   render={({ field }) => (
    //     <FormControl fullWidth>
    //       <TextField label={label} {...props}  {...field} />
    //     </FormControl>
    //   )}
    // />
    <FormControl fullWidth>
      <StyledTextField /* label={label}  */{...props} />
    </FormControl>
  );
};

const FieldTypes = {
  textField: Field,
  date: (props: any) => (
    <Field
      {...props}
      type="text"
      // InputProps={{
        // startAdornment: <InputAdornment position="start">+</InputAdornment>,
      // }}
    />
  ),
  select: Dropdrown,
  textArea: Field,
  phoneNumber: (props: any) => (
    <Field
      {...props}
      type="number"
      // InputProps={{
        // startAdornment: <InputAdornment position="start">+</InputAdornment>,
      // }}
    />
  ),
  amount: (props: any) => (
    <Field
      {...props}
      type="number"
      InputProps={{
        startAdornment: <InputAdornment position="start" sx={{ marginLeft: 0 }}>$</InputAdornment>,
      }}
    />
  ),
};

const LabelTypes = {
  linebreak: (props: any) => (
    <Box>
      <Typography variant="caption" sx={{ backgroundColor: "#EFFCFF", color: "#565656"}}>
        {props.label}
      </Typography>
    </Box>
  ),
  label: (props: any) => (
    <Box>
      {props.label.split("\n").map((label: any) => (
        <Typography variant={props?.properties?.variant || "body2"} key={label}>
          {label}<br/>
        </Typography>
      ))}
    </Box>
  )
};

const FieldSelector = ({ type, props }: { type: any, props: any }) => {
  const FieldGotten = FieldTypes[type as keyof typeof FieldTypes] || FieldTypes.textField;
  if (type === "lineLabel" || type === "linebreak" || type === "label") {
    const Label = LabelTypes[type as keyof typeof LabelTypes] || LabelTypes.label;
    return (
      <Label {...props} />
    );
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue}
      rules={{ required: !props.isOptional, ...props?.validations }}
      render={({ field, ...rest }) => {
        // console.log({ field, rest }); 
        return (
          <FieldGotten
            error={!!props.errors?.[props.name]}
            {...props}
            {...field}
            label={!props.isOptional ? `* ${props.label}` : props.label}
          />
        )
      }}
    />
  );
}

const FormBuilder = ({ /* children, */ schema, register, control, errors }: { /* children: any, */ schema: any, register: any, control: any, errors: any }) => {
  // const { handleSubmit, register, control } = useForm({
  //   defaultValues: getDefaultValues(schema),
  //   // defaultValues: {
  //   //   freeText: "HOLA"
  //   // }
  // });
  // const onSubmit: SubmitHandler<{}> = (data: any) => console.log(data)
  return (
    // <Form>
    // <form onSubmit={handleSubmit(onSubmit)}> 
    <>
      <Grid container spacing={2}>
        {schema?.parameters?.map((field: any) => {
            return (
              <Grid item xs={field.properties.columns} key={field.name}>
                <FieldSelector type={field.type} props={{
                  ...field.properties,
                  ...field,
                  control,
                  ...(field.type !== "lineLabel" || field.type !== "linebreak" || field.type !== "labelList") ? register(field.name) : {},
                  errors }}/>
                {/* <Field
                  {...field.properties}
                  label={field.label}
                  name={field.name}
                  control={control}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  disabled={field.properties.disabled}
                /> */}
              </Grid>
            );
          })
        }
      </Grid>
      <Typography variant="body2" marginTop="12px" sx={{ color: Object.entries(errors || {}).length ? "red" : "#565656" }}>
        * Campos obligatorios del mensaje
      </Typography>
      {errors.phoneNumber?.type === "pattern" && (
        <Typography variant="body2" marginTop="12px" sx={{ color: Object.entries(errors || {}).length ? "red" : "#565656" }}>
          * Debe ingresar un número telefonico válido
        </Typography>
      )}
      {/* <button type="submit">Submit</button> */}
    </>
    // </form>
    // </Form>
  );
};

export default FormBuilder;
