import {
  Alignment,
  Columns,
  RowOptions,
} from "@/app/component/inbox-table/type";
import Image from "next/image";

const DocumentAction = ({ document }: { document: any }) => {
  if (!document) return "-";

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

const documentGP: Columns = {
  id: "documentGP",
  label: "Documento GP",
  align: Alignment.CENTER,
  sortable: false,
  render: ({ row }: { row: any }) => {
    const { documentGP } = row || {};
    return <DocumentAction document={documentGP} />;
  },
};

const documentCM: Columns = {
  id: "documentCM",
  label: "Copia Maestra",
  align: Alignment.CENTER,
  sortable: false,
  render: ({ row }: { row: any }) => {
    const { documentCM } = row || {};
    return <DocumentAction document={documentCM} />;
  },
};

const documentR: Columns = {
  id: "documentR",
  label: "Documento Reparo",
  align: Alignment.CENTER,
  sortable: false,
  render: ({ row }: { row: any }) => {
    const { documentR } = row || {};
    return <DocumentAction document={documentR} />;
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
  documentCM,
  documentGP,
  documentR,
];

export const rowOptions: RowOptions = {
  documents: {
    align: Alignment.CENTER,
  },
};
