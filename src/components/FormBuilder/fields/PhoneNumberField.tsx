import { PatternFormat } from "react-number-format";
import Field from "./Field";

const PhoneNumberField = (props: any) => (
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
);

export default PhoneNumberField;
