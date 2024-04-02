import { montserrat } from "@/utils/fonts";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({
  label = "Loading...",
  size = 30,
  minHeight = "200px",
  width = "100%",
  thickness = 2,
}: {
  label?: string
  size?: string | number,
  minHeight?: string | number,
  width?: string | number,
  thickness?: number | undefined,
}) => {
  return (
    <Box sx={{
      width, 
      minHeight,
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column' 
    }}>
      <CircularProgress size={size} thickness={thickness} />
      {label && (
        <Typography
          variant='body2'
          fontFamily={montserrat.style.fontFamily} 
          mt={3}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
