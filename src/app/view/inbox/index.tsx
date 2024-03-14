import { Box, Paper } from "@mui/material";
import DataTable from "../../component/inbox-table";
import InboxHeader from "@/app/component/inbox-header";
import { rows } from "./mock";
export default function InboxScreen() {
  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ m: 2 }}>
        <InboxHeader amountMessages={rows.length} />
        <DataTable />
      </Box>
    </Paper>
  );
}
