import { montserrat } from "@/utils/fonts";
import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import Typography from "@mui/material/Typography/Typography";
import { loaderContainerSx } from "./styles";
import React from "react";

export const TableContentLoaderComponent = ({loadingMessage} : { loadingMessage?: string }) => {
    return (
      <TableRow>
        <TableCell colSpan={10} component="th" scope="row">
          <Box sx={loaderContainerSx}>
            <CircularProgress size={45} thickness={2} />
            <Typography 
              variant='body2'
              fontFamily={montserrat.style.fontFamily} 
              mt={3}
            >{loadingMessage}</Typography>
          </Box>
        </TableCell>
      </TableRow>
    )
  };

export const TableContentLoader = React.memo(TableContentLoaderComponent);