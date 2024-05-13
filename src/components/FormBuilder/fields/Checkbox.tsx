import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from "@mui/material"

const Checkboxx = ({ value, options, onChange, label, error, ...rest }: {value: any, options: any, label: any, onChange: any, error: any }) => {
console.log({ "CHECKBOX": value, options, rest });
  if (options) {
    return (
      <div>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Typography variant="caption" sx={{ backgroundColor: "#EFFCFF", color: error ? "#d32f2f" : "#565656", padding: "4px" }}>
            {label}
          </Typography>
          <svg width="100%" height="1" viewBox="0 0 100% 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "50%" }}>
            <line x1="4.37114e-08" y1="0.5" x2="100%" y2="0.500094" stroke="#898989" stroke-dasharray="5 5"/>
          </svg>
        </Box>
        {/* <Typography variant="body2">{label}</Typography> */}
        {options.map((option: any) => (
          <div style={{ display: "flex", alignItems: "center"}}>
            <Checkbox checked={option.value === value} onChange={() => onChange(option.value)} />
            <Typography variant="body2" sx={{ color: "#565656" }}>{option.label}</Typography>
          </div>
        ))}
      </div>
    )
  }
  return (
    // <FormControl
    //   required
    //   // error={error}
    //   component="fieldset"
    //   // sx={{ m: 3 }}
    //   variant="standard"
    // >
    //   <FormLabel component="legend">Pick two</FormLabel>
      <FormGroup>
        {options.map((option: any) => {
          <FormControlLabel
            // key={option.value}
            control={
              <Checkbox /* checked={option.value === value} onChange={handleChange} name={option.value} */ />
            }
            label={option.label}
          />

        })}
      </FormGroup>
      // {/* <FormHelperText>You can display an error</FormHelperText> */}
    // </FormControl>
  //   <>
  //     <Checkbox checked={state === 0} />
  //     <Checkbox checked={state === 1} />
  //     <Checkbox checked={state === 2} />
  //  </>
  )
}

export default Checkboxx;