import React from "react";

import Box from "@mui/material/Box/Box";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import { loaderContainerSx } from "./styles";
import Loader from "@/components/Loader";

export const TableContentLoaderComponent = ({
  loadingMessage,
  minHeight,
}: {
  loadingMessage?: string;
  minHeight?: number | string;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={20} component="th" scope="row">
        <Box sx={loaderContainerSx} minHeight={minHeight}>
          <Loader label={loadingMessage} minHeight={minHeight} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export const TableContentLoader = React.memo(TableContentLoaderComponent);
