import { Box, Paper } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { rows } from "./mock"
import { columnsSent } from "@/app/component/inbox-table/constants";

export default function SentScreen() {
  return (
    <Paper sx={{ width: "calc(100% - 270px)" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader amountMessages={rows.length} title={'Mensajes Enviados'}/>
        <DataTable rows={rows} columns={columnsSent}/>
      </Box>
    </Paper>
  );
}