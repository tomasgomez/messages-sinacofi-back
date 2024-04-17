import {
  StyledContainerProgressBar,
  StyledContainerTitleProgressBar,
  StyledTitleProgressBar,
  StyledContainerBar,
  StyledContainerBlock,
  StyledContainerBlockStatus,
  StyledContainerIcon,
  StyledCheckIcon,
  StyledTypographyCode,
  StyledTypographyStatus,
  StyledLinearProgress,
} from "./styled";

// with status -> green
// without status -> blue
// without data -> grey

const ProgressBar = ({ data = [] }: { data?: any }) => {
  let firstElement = null;
  let lastElement = null;
  let insideElements: any = [];

  if (data.length > 0) {
    firstElement = data[0];
    if (data.length > 7) {
      lastElement = data[data.length - 1];
      insideElements = data.slice(1, data.length - 1);
    } else {
      insideElements = data.slice(1, data.length);
    }
  }
  while (insideElements.length < 6) {
    insideElements.push(null);
  }

  return (
    <StyledContainerProgressBar>
      <StyledContainerTitleProgressBar>
        <StyledTitleProgressBar>Seguimiento de Mensajes</StyledTitleProgressBar>
      </StyledContainerTitleProgressBar>
      <StyledContainerBar>
        <StyledContainerBlock>
          {firstElement && (
            <StyledContainerBlockStatus>
              <StyledContainerIcon status={firstElement?.messageStatus}>
                {!firstElement?.isPending && (
                  <StyledCheckIcon
                    fontSize="small"
                    iconColor={firstElement?.messageStatus}
                  />
                )}
              </StyledContainerIcon>
              <StyledTypographyCode>
                MS {firstElement?.code}
              </StyledTypographyCode>
              <StyledTypographyStatus>
                {firstElement?.messageStatus}
              </StyledTypographyStatus>
            </StyledContainerBlockStatus>
          )}
          <StyledLinearProgress
            variant="determinate"
            value={firstElement ? 100 : 0}
            borderRadius="left"
            backgroundColor={firstElement?.isPending ? "#00B2E2" : "#00BC70"}
            borderRight={!!firstElement}
          />
        </StyledContainerBlock>

        {insideElements.map((elem: any) => {
          const element = elem;
          const status = !element?.isPending;
          return (
            <StyledContainerBlock>
              {element && (
                <StyledContainerBlockStatus>
                  <StyledContainerIcon status={element?.messageStatus}>
                    {status && (
                      <StyledCheckIcon
                        fontSize="small"
                        iconColor={element?.messageStatus}
                      />
                    )}
                  </StyledContainerIcon>
                  <StyledTypographyCode>
                    MS {element?.code}
                  </StyledTypographyCode>
                  <StyledTypographyStatus>
                    {element?.messageStatus}
                  </StyledTypographyStatus>
                </StyledContainerBlockStatus>
              )}
              <StyledLinearProgress
                variant="determinate"
                value={element ? 100 : 0}
                borderRadius="center"
                backgroundColor={status ? "#00BC70" : "#00B2E2"}
                borderRight={!!element}
              />
            </StyledContainerBlock>
          );
        })}
        <StyledContainerBlock>
          {lastElement && (
            <StyledContainerBlockStatus>
              <StyledContainerIcon status={lastElement?.messageStatus}>
                {!lastElement?.isPending && (
                  <StyledCheckIcon
                    fontSize="small"
                    iconColor={lastElement?.messageStatus}
                  />
                )}
              </StyledContainerIcon>
              <StyledTypographyCode>
                MS {lastElement?.code}
              </StyledTypographyCode>
              <StyledTypographyStatus>
                {lastElement?.messageStatus}
              </StyledTypographyStatus>
            </StyledContainerBlockStatus>
          )}

          <StyledLinearProgress
            variant="determinate"
            value={lastElement ? 100 : 0}
            borderRadius="right"
            backgroundColor={lastElement?.isPending ? "#00B2E2" : "#00BC70"}
          />
        </StyledContainerBlock>
      </StyledContainerBar>
    </StyledContainerProgressBar>
  );
};

export default ProgressBar;
