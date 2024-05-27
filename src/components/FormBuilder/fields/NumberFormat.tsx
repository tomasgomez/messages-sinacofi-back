import { NumericFormat as NumericFormatReact } from "react-number-format";
import { useFormContext } from "react-hook-form";

const NumericFormat = (props: any) => {
  const { inputRef, onChange, ...other } = props;
  const { setValue } = useFormContext();

  return (
    <NumericFormatReact
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: any) => {
        onChange(values.value);
        setValue && setValue(other.id, values.value);
      }}
      thousandSeparator="."
      decimalSeparator=","
      allowLeadingZeros
      // isNumericString
    />
  );
}

export default NumericFormat;