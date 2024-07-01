import {
  NoSearchContainer,
  StyledAddHomeOutlinedIcon,
  StyledMainText,
  StyledText,
} from "./styles";

const NoMortgageDischargeNormalization = (props: { height: number }) => {
  const { height = 474 } = props || {};

  return (
    <NoSearchContainer height={height}>
      <StyledAddHomeOutlinedIcon />
      <StyledMainText>
        Actualmente no tienes ninguna solicitud de alzamiento hipotecario con
        clientes en normalización.
      </StyledMainText>
      <StyledText width={340}>
        Normaliza una solicitud para verla aquí.
      </StyledText>
    </NoSearchContainer>
  );
};

export default NoMortgageDischargeNormalization;
