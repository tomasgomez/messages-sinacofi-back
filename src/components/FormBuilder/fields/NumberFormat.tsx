import { NumericFormat as NumericFormatReact } from "react-number-format";

const NumericFormat = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormatReact
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

export default NumericFormat;