import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";
import Image from "next/image";

const DocumentAction = ({ row }: { row: any }) => {
  const { id = "", documents } = row || {};

  const handleActionPrint = async () => {
    window.open(`/pdf-viewer?id=${encodeURIComponent(id)}`, "_blank");
  };

  return (
    <Image
      style={{ cursor: "pointer" }}
      src="/imagenPDF.png"
      alt="pdf-image.png"
      loading="lazy"
      width="30"
      height="30"
      onClick={handleActionPrint}
    />
  );
};

const documentsGP: Columns = {
  id: "documents",
  label: "Documento GP",
  align: Alignment.LEFT,
  sortable: false,
  render: ({ row }: { row: any }) => {
    return <DocumentAction row={row} />;
  },
};

const documentsCM: Columns = {
  id: "documents",
  label: "Copia Maestra",
  align: Alignment.LEFT,
  sortable: false,
  render: ({ row }: { row: any }) => {
    return <DocumentAction row={row} />;
  },
};

export const columnsDeedsReports: Columns[] = [
  {
    id: "NSR",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Inst. Destino",
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
    label: "RUT Comprador",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "RUT Vendedor",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Fecha",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "Hora",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "NSE",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSR",
    label: "MS",
    align: Alignment.LEFT,
    sortable: false,
  },
  documentsCM,
  documentsGP,
];

export const rowOptions: RowOptions = {
  NSR: {
    align: Alignment.CENTER,
  },
};
