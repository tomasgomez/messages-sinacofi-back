import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useCallback, useMemo, useRef } from "react";
import MaskedInput from "react-text-mask";

const RutMask = (props: any) => {
  const { inputRef, value = "", ...other } = props;

  // const generateMask = (inputValue: any) => {
  //   // Define the initial mask as an empty array
  //   let rutMask = [];
  //   if (inputValue.length === 0) {
  //     // Show the first digit with the initial format [1-9]
  //     rutMask.push(/[1-9]/);
  //     return rutMask;
  //   }
  //   // Based on the length of the input value, progressively add the mask elements
  //   for (let i = 0; i < inputValue.length; i++) {
  //     if (i === 0) {
  //       // Show the first digit with the initial format [1-9]
  //       rutMask.push(/[1-9]/);
  //     } else if (i === 1) {
  //       // Show the dot after the first digit
  //       rutMask.push('.');
  //     } else if (i === 4 || i === 7) {
  //       // Show the dots at positions 4 and 7
  //       rutMask.push('.');
  //     } else if (i === 11) {
  //       // Show the dash at position 11
  //       rutMask.push('-');
  //     } else {
  //       // For other positions, show a placeholder
  //       rutMask.push(/\d/);
  //     }
  //   }

  //   // If the input value length exceeds 12, show the last character
  //   if (inputValue.length >= 12) {
  //     rutMask.push(/[0-9kK]/);
  //   }

  //   return rutMask;
  // };
  const generateMask = (inputValue: any) => {
    // Determine the length of the entered value
    const enteredLength = (inputValue || "").length;

    // Define the rut mask pattern based on the entered length
    let rutMask = [];

    if (enteredLength === 0) {
      // Show only the optional first digit
      rutMask = [/[1-9]/, /\d?/];
    } else if (enteredLength <= 3) {
      // Show first digit, dot, and next three digits
      rutMask = [/[1-9]/, /\d/, '.', /\d?/, /\d?/, /\d?/];
    } else if (enteredLength <= 6) {
      // Show first digit, dot, next three digits, dot, and next three digits
      rutMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d?/, /\d?/];
    } else {
      // Show full RUT format
      rutMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[0-9kK]/];
    }

    return rutMask;
  };

  // const rutMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[0-9kK]/];
  // const rutMask = "9{1,2}.9{3}.9{3}-(9|k|K)";
  // const generateMask = useCallback((inputValue: any) => {
  //   // Determine if the first digit is optional based on the length of the input value
  //   const enteredLength = inputValue.length;

  //   // Define the rut mask pattern based on the entered length
  //   let rutMask: (string | RegExp)[] = [];


  //   // Define the rut mask pattern with the first digit as optional
  //   // const rutMask = isFirstDigitOptional
  //   //   ? [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[0-9kK]/]
  //   //   : [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[0-9kK]/];
  //   if (enteredLength === 0) {
  //     // Show only the optional first digit
  //     rutMask = [/\d/];
  //   } else if (enteredLength <= 4) {
  //     // Show first digit, dot, and next three digits
  //     rutMask = [/\d/, '.', /\d?/, /\d?/, /\d?/];
  //   } else if (enteredLength <= 7) {
  //     // Show first digit, dot, next three digits, dot, and next three digits
  //     rutMask = [/\d/, '.', /\d/, /\d/, /\d/, '.', /\d?/, /\d?/];
  //   } else {
  //     // Show full RUT format
  //     rutMask = [/\d?/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[0-9kK]/];
  //   }

  //   return rutMask;
  // }, []);

  console.log({ value })

  const rutMask = useMemo(() => generateMask(value), [value]);

  return (
    <MaskedInput
      {...other}
      value={value}
      ref={(ref) => {
        inputRef?.(ref ? ref.inputElement : null);
      }}
      mask={rutMask}
      placeholderChar={'\u2000'}
      showMask
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
