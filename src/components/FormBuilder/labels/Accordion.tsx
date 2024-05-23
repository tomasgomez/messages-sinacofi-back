import { ExpandMore } from "@mui/icons-material";
import { AccordionDetails, Accordion as AccordionMUI, AccordionSummary, styled } from "@mui/material";
import ParamenterListBuilder from "../ParametersBuilder";
import { useFormContext } from "react-hook-form";

const StyledAccordionMUI = styled(AccordionMUI)({
  margin: "0 -20px",
  marginBottom: "24px",
  borderTop: "1px solid #CBCBCB",
  "&.MuiPaper-root.Mui-expanded": {
    margin: "0 -20px",
  }
});
const StyledAccordionSummary = styled(AccordionSummary)({
  fontWeight: 500,
  fontSize: "20px",
  padding: "24px",
  margin: 0,
  '& .MuiAccordionSummary-content': {
    margin: 0,
    "&.Mui-expanded": {
      margin: 0,
    }
  },
  "&.Mui-expanded": {
    borderBottom: "1px solid #CBCBCB",
  }
});

const Accordion = ({ parameters, label, control, errors }: {parameters: any, label: any, control: any, errors: any,}) => {
  const { register } = useFormContext();
  return (
    <StyledAccordionMUI sx={{ margin: "0 -20px" }} square>
      <StyledAccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
        // sx={{  }}
      >
        {label}
      </StyledAccordionSummary>
      <AccordionDetails>
        <ParamenterListBuilder parameters={parameters} register={register} control={control} errors={errors} />
      </AccordionDetails>
    </StyledAccordionMUI>
  );
};

export default Accordion;
