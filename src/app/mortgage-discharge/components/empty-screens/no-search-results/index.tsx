import {
  NoSearchContainer,
  StyledAddHomeOutlinedIcon,
  StyledMainText,
  StyledText,
} from "./styles";

const NoSearchResult = (props: { height: number }) => {
  const { height = 474 } = props || {};

  return (
    <NoSearchContainer height={height}>
      <StyledAddHomeOutlinedIcon />
      <StyledMainText>
        No pudimos encontrar resultados para tu búsqueda.
      </StyledMainText>
      <StyledText width={340}>
        Intenta ajustar los filtros y buscar nuevamente.
      </StyledText>
    </NoSearchContainer>
  );
};

export default NoSearchResult;
