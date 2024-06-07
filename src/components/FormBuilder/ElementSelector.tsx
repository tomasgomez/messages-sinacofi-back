import { useFormContext, Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { DatePickerInput } from "@/app/mortgage-discharge/in-process/header/components/filters/filter-selector/form-elements/date";
import Dropdown from "../Dropdown";
import RutField from "./fields/RutField";
import Checkbox from "./fields/Checkbox";
import AmountField from "./fields/AmountField";
import Field from "./fields/Field";
import PasswordField from "./fields/PasswordField";
import PhoneNumberField from "./fields/PhoneNumberField";
import Accordion from "./labels/Accordion";

const Select = (props: any) => {
  const { setValue } = useFormContext();
  const onChange = (value: unknown) => {
    setValue(props.id, value);
  };
  return (
    <Dropdown
      {...props}
      maxMenuHeight={190}
      maxMenuWidth={190}
      onChange={onChange}
    />
  );
};
const FieldTypes = {
  textField: Field,
  checkbox: (props: any) => (
    <Checkbox {...props} options={props.properties.options} />
  ),
  date: DatePickerInput,
  select: Select,
  textArea: (props: any) => <Field {...props} multiline />,
  dni: RutField,
  phoneNumber: PhoneNumberField,
  amount: AmountField,
  password: PasswordField,
};

const LabelTypes = {
  linebreak: (props: any) => (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Typography
        variant="caption"
        sx={{ backgroundColor: "#EFFCFF", color: "#565656", padding: "4px" }}
      >
        {props.label}
      </Typography>
      <svg
        width="100%"
        height="1"
        viewBox="0 0 100% 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: "50%" }}
      >
        <line
          x1="4.37114e-08"
          y1="0.5"
          x2="100%"
          y2="0.500094"
          stroke="#898989"
          stroke-dasharray="5 5"
        />
      </svg>
    </Box>
  ),
  label: (props: any) => (
    <Box>
      {props.label.split("\\n").map((label: any) => (
        <Typography variant={props?.properties?.variant || "body2"} key={label}>
          {label}
          <br />
        </Typography>
      ))}
    </Box>
  ),
};

const ElementSelector = ({ type, props }: { type: any; props: any }) => {
  const FieldGotten =
    FieldTypes[type as keyof typeof FieldTypes] || FieldTypes.textField;

  if (type === "accordion") {
    return <Accordion {...props} />;
  }

  if (type === "linebreak" || type === "label") {
    const Label =
      LabelTypes[type as keyof typeof LabelTypes] || LabelTypes.label;
    return <Label {...props} />;
  }

  const {
    validations: { disabled, ...rules },
    ...inputProps
  } = props;

  return (
    <Controller
      name={inputProps.id}
      control={inputProps.control}
      defaultValue={inputProps.defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <FieldGotten
            error={!!props.errors?.[inputProps.id]}
            {...inputProps}
            {...field}
            // {...validations}
            label={rules?.required ? `* ${inputProps.label}` : inputProps.label}
          />
        );
      }}
    />
  );
};

export default ElementSelector;
