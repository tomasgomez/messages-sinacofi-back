import {
  StyledMoalSection,
  StyledModalItem,
} from "@/app/component/inbox-header/style";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { MSParameter, Message } from "../../../type";
import DocumentCard from "@/app/mortgage-discharge/components/info-modal/components/document-card";

export function ModalMainContent(props: {
  data: Message;
  isinProcess?: boolean;
}) {
  const { data, isinProcess = false } = props || {};
  const { parameters = [] } = data || {};
  return (
    <>
      <Stack spacing={3}>
        <Box>
          <StyledMoalSection variant="h6">
            Contenido del Mensaje
          </StyledMoalSection>
          {parameters.map((field: MSParameter, index: number) => {
            return (
              <Stack
                display="flex"
                flexDirection="row"
                mb={1}
                key={`${field?.name || ""} "-" ${index}`}
              >
                <Typography fontSize={"12px"} color="#49454F" mr={1.5}>
                  {field?.label || ""}:
                </Typography>
                <StyledModalItem noWrap>{field?.value || "-"}</StyledModalItem>
              </Stack>
            );
          })}
          <Stack display="flex" flexDirection="row" alignItems="center">
            {data?.documents?.map((document: any, index: number) => (
              <DocumentCard
                document={document}
                key={`${document.documentName}-${index}-document`}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
