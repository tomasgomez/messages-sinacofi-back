import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";
import Image from "next/image";

const DocumentAction = ({ document }: { document: any }) => {
  const { id } = document;

  const handleActionPrint = async () => {
    window.open(`/pdf-viewer?id=${encodeURIComponent(id)}`, "_blank");
  };

  return (
    <div
      style={{
        maxHeight: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ cursor: "pointer" }}
        src="/imagenPDF.png"
        alt="pdf-image.png"
        loading="lazy"
        width="25"
        height="25"
        onClick={handleActionPrint}
      />
    </div>
  );
};

const documentsGP: Columns = {
  id: "documents",
  label: "Documento GP",
  align: Alignment.CENTER,
  sortable: false,
  render: ({ row }: { row: any }) => {
    const { documents = [] } = row || {};
    return <DocumentAction document={documents[0] || []} />;
  },
};

const documentsCM: Columns = {
  id: "documents",
  label: "Copia Maestra",
  align: Alignment.CENTER,
  sortable: false,
  render: ({ row }: { row: any }) => {
    const { documents = [] } = row || {};
    return <DocumentAction document={documents[1] || []} />;
  },
};

export const columnsDeedsReports: Columns[] = [
  {
    id: "cukCode",
    label: "Codigo Interno",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "institutionDestination",
    label: "Inst. Destino",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "buyerDni",
    label: "RUT Comprador",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "ownerDni",
    label: "RUT Vendedor",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationDate",
    label: "Fecha",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "creationTime",
    label: "Hora",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "NSE",
    label: "NSE",
    align: Alignment.LEFT,
    sortable: false,
  },
  {
    id: "messageCode",
    label: "MS",
    align: Alignment.LEFT,
    sortable: false,
  },
  documentsCM,
  documentsGP,
];

export const rowOptions: RowOptions = {
  documents: {
    align: Alignment.CENTER,
  },
};
