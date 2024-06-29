import { Grid } from "@mui/material";
import ElementSelector from "./ElementSelector";

const ParamenterListBuilder = ({ parameters, control, register, errors, }: {parameters: any, control: any, register: any, errors: any,}) => {
  return (
    <Grid container spacing={2}>
      {parameters?.map((field: any) => {
          return (
            <Grid item xs={field.properties.columns} key={field.id}>
              <ElementSelector
                type={field.type}
                props={{
                  ...field.properties,
                  control,
                  ...(field.type !== "label" && field.type !== "linebreak" && field.type !== "accordion" && field.type !== "blankSpace") ? register(field.id) : {},
                  ...field,
                  errors
                }}
              />
            </Grid>
          );
        })
      }
    </Grid>
  )
};

export default ParamenterListBuilder;
