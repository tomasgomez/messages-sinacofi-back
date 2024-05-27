import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import Field from "./Field";

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
  );
}

export default PasswordField;
