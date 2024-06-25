import {
  NoSearchContainer,
  StyledAddHomeOutlinedIcon,
  StyledMainText,
  StyledText,
} from "./styles";

const NoMortgageDischargeCompleted = (props: { height: number }) => {
  const { height = 474 } = props || {};

  return (
    <NoSearchContainer height={height}>
      <StyledAddHomeOutlinedIcon />
      <StyledMainText>
        Actualmente no tienes ninguna solicitud de alzamiento hipotecario
        Finalizada
      </StyledMainText>
      <StyledText width={340}>
        Finaliza una solicitud para verla aquí.
      </StyledText>
    </NoSearchContainer>
  );
};

export default NoMortgageDischargeCompleted;
