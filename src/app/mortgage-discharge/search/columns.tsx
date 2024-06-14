import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";
import Link from "@mui/material/Link";

const actions: Columns = {
  id: "actions",
  label: "Acciones",
  align: Alignment.LEFT,
  sortable: false,
  render: ({ row }: { row: any }) => {
    // const { id = "" } = row || {};
    const handleClick = () => {
      console.log("open details");
    };

    return (
      <Link href="#" onClick={handleClick}>
        Ver Detalle
      </Link>
    );
  },
};

export const columnsSearch: Columns[] = [
  {
    id: "NSR",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Fecha de Recepción",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Fecha de Último Estado AH",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "OSN",
    align: Alignment.LEFT,
    sortable: false,
  },
  actions,
];

export const rowOptions: RowOptions = {
  NSR: {
    align: Alignment.CENTER,
  },
};
