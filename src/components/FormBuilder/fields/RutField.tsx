import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMemo, useRef } from "react";
import MaskedInput from "react-text-mask";

const RutMask = (props: any) => {
  const { inputRef, value = "", ...other } = props;

  const generateMask = (inputValue: string) => {
    // Determine the length of the entered value
    // with the split only conserve the numeric part of rut, not the spaces (\u2000) added for the mask
    const realValue = (inputValue || "")
      .split("\u200B")[0]
      .replace(/[.-]/g, "");
    const enteredLength = realValue.length;
    // Define the rut mask pattern based on the entered length
    let rutMask = [];

    if (enteredLength < 1) {
      // Show only the optional first digit
      rutMask = [/[1-9]/, /\d?/];
    } else if (enteredLength <= 3) {
      // Show first digit, dot, and next three digits
      rutMask = [/[1-9]/, ".", /\d?/, /\d?/, /\d?/];
    } else if (enteredLength <= 6) {
      // Show first digit, dot, next three digits, dot, and next three digits
      rutMask = [/[1-9]/, ".", /\d/, /\d/, /\d/, ".", /\d?/, /\d?/, /\d?/];
    } else if (enteredLength === 7) {
      rutMask = [
        /[1-9]/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        /-?/,
        /[0-9kK]?/,
      ];
    } else if (
      enteredLength <= 8 &&
      (realValue[7] || "").toLocaleLowerCase() === "k"
    ) {
      // Show full RUT format
      rutMask = [
        /[1-9]/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9kK]/,
      ];
    } else if (
      enteredLength <= 8 &&
      realValue[7] &&
      (realValue[7] || "").toLocaleLowerCase() !== "k"
    ) {
      // Show full RUT format
      rutMask = [
        /[1-9]/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /[0-9kK]/,
      ];
    } else {
      rutMask = [
        /[1-9]/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9kK]/,
      ];
    }
    return rutMask;
  };

  const rutMask = useMemo(() => generateMask(value), [value]);
  return (
    <MaskedInput
      {...other}
      value={value}
      ref={(ref) => {
        inputRef?.(ref ? ref.inputElement : null);
      }}
      mask={rutMask}
      placeholderChar={"\u200B"}
    />
  );
};

const RutField = (props: any) => {
  const inputRef = useRef(null);
  return (
    <FormControl fullWidth>
      <TextField
        {...props}
        InputProps={{
          inputComponent: RutMask,
          inputRef: inputRef,
        }}
      />
    </FormControl>
  );
};

export default RutField;
