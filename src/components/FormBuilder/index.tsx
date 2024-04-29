import { Grid, TextField, Typography, TextFieldProps, FormControl, InputAdornment, styled, Box, IconButton } from "@mui/material";
import Dropdrown from "../Dropdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DatePickerInput } from "@/app/mortgage-discharge/in-process/header/components/filters/filter-selector/form-elements/date";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RutField from "./fields/RutField";

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

const NumberFormatCustom = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: any) => {
        onChange(values.value);
      }}
      thousandSeparator="."
      decimalSeparator=","
      allowLeadingZeros
      // isNumericString
    />
  );
}

const PasswordField = (props: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlerOpenModal = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <Field
      {...props}
      type={showPassword ? 'text' : 'password'}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        ...props.InputProps,
        type: showPassword ? 'text' : 'password',
        ...(isFocused || props.value ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                key={`expand-icon`}
                onClick={handlerOpenModal}
                onMouseDown={handlerOpenModal}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        } : {})
      }}
    />
  )
}
const FieldTypes = {
  textField: Field,
  date: (props: any) => {
    console.log("DATEPICKER: ", { props });
    return (
      <DatePickerInput {...props} />
    );
    // <DatePicker {...props} defaultValue={dayjs(props?.defaultValue)}/>
    // <Field
    //   {...props}
    //   type="text"
      // InputProps={{
        // startAdornment: <InputAdornment position="start">+</InputAdornment>,
      // }}
    // />
  },
  select: Dropdrown,
  textArea: Field,
  rut: ({ ...other }: any) => (
    <RutField
      {...other}
      // mask="9{1,2}.9{3}.9{3}-(9|k|K)"
      // valueIsNumericString={true}
      // getInputRef={inputRef}
      // onValueChange={(values: any) => {
      //   onChange(values.value);
      // }}
    />
    
  ),
  phoneNumber: (props: any) => (
    <Field
      {...props}
      // type="number"
      placeholder="+56 (#) ####-####"
      InputProps={{
      //   startAdornment: <InputAdornment position="start">+</InputAdornment>,
        inputComponent: (props: any) => {
          const { inputRef, onChange, ...other } = props;
          return (
            <PatternFormat
              {...other}
              format="+56 (#) ####-####"
              valueIsNumericString={true}
              getInputRef={inputRef}
              onValueChange={(values: any) => {
                onChange(values.value);
              }}
            />
          );
        }
      }}
    />
  ),
  amount: (props: any) => (
    <Field
      {...props}
      prefix="$"
      // type="number"
      // InputProps={{
      //   startAdornment: <InputAdornment position="start" sx={{ marginLeft: 0 }}>$</InputAdornment>,
      // }}
      InputProps={{
        inputComponent: NumberFormatCustom
      }}
    />
  ),
  password: PasswordField
};

const LabelTypes = {
  linebreak: (props: any) => (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Typography variant="caption" sx={{ backgroundColor: "#EFFCFF", color: "#565656", padding: "4px" }}>
        {props.label}
      </Typography>
      <svg width="100%" height="1" viewBox="0 0 100% 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "50%" }}>
        <line x1="4.37114e-08" y1="0.5" x2="100%" y2="0.500094" stroke="#898989" stroke-dasharray="5 5"/>
      </svg>
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
  if ("password" === type) {
    console.log({ password: type });
  }
  if (type === "linebreak" || type === "label") {
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
      rules={{ ...props?.validations, required: !(props.validations?.required === false) }}
      render={({ field, ...rest }) => {
        return (
          <FieldGotten
            error={!!props.errors?.[props.name]}
            {...props}
            {...field}
            label={props.validations?.required === false ? props.label : `* ${props.label}`}
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
  console.log({ errors });
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
                  ...(field.type !== "label" || field.type !== "linebreak") ? register(field.name) : {},
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
