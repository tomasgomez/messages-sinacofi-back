import Image from "next/image";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { base64ToBlob, downloadFile } from "@/app/mortgage-discharge/utils";

const DocumentCard = ({ document }: any) => {
  const { documentName, documentSize } = document;

  const handleClick = () => {
    const blob = base64ToBlob(document.content);
    downloadFile(blob, document.documentName);
  };

  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      style={{
        padding: "5px",
        margin: 5,
        marginLeft: 0,
        background: "#F8F8F8",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Image
        src="/pdfFileIcon.svg"
        alt="pdfFileIcon"
        loading="lazy"
        width="16"
        height="16"
        style={{ marginRight: 5 }}
      />
      <Typography fontSize={"14px"} color="#000" mr={1.5}>
        {documentName}
      </Typography>
      <Typography fontSize={"14px"} color="#898989" mr={1.5}>
        {documentSize || "N/A"}
      </Typography>
    </Stack>
  );
};

export default DocumentCard;
