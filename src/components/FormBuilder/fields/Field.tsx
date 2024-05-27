import { FormControl, TextField, TextFieldProps, styled } from "@mui/material";

type FieldProps = {
  control: any;
  name: string;
  props: any;
} & TextFieldProps

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

export default Field;
