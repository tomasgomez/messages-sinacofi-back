import React from "react";

import Box from "@mui/material/Box/Box";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import { loaderContainerSx } from "./styles";
import Loader from "@/components/Loader";

export const TableContentLoaderComponent = ({loadingMessage} : { loadingMessage?: string }) => {
    return (
      <TableRow>
        <TableCell colSpan={20} component="th" scope="row">
          <Box sx={loaderContainerSx}>
            <Loader label={loadingMessage} />
          </Box>
        </TableCell>
      </TableRow>
    )
  };

export const TableContentLoader = React.memo(TableContentLoaderComponent);