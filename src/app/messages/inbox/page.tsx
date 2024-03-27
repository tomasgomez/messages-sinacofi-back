import { Box, Paper } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { rows } from "./mock";
import { columnsInbox } from "@/app/component/inbox-table/constants";

export default function InboxScreen() {
  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader amountMessages={rows.length} title={'Bandeja de Entrada'}/>
        <DataTable rows={rows} columns={columnsInbox}/>
      </Box>
    </Paper>
  );
}
