import { montserrat } from "@/utils/fonts";
import { Box, CircularProgress, Typography } from "@mui/material";
import './style.css';

const Loader = ({
  label = "Cargando...",
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
      <Box component="span" className="loader"/>
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
