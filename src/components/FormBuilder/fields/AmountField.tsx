import Field from "@/components/Field";
import NumericFormat from "./NumberFormat";

const AmountField = (props: any) => (
  <Field
    {...props}
    prefix="$"
    // type="number"
    // InputProps={{
    //   startAdornment: <InputAdornment position="start" sx={{ marginLeft: 0 }}>$</InputAdornment>,
    // }}
    InputProps={{
      inputComponent: NumericFormat
    }}
  />
);

export default AmountField;