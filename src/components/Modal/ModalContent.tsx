import { Box, Typography } from "@mui/material";

interface ModalContentProps {}

export function ModalContent(
  props: React.PropsWithChildren<ModalContentProps>
) {
  return (
    <Box my={4} px={8}>
      {props.children}
    </Box>
  );
}
