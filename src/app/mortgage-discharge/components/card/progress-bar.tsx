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
import { getStatusText, getIsPendingStatus } from "@/utils/mortgage-discharge";
import { Message } from "@/app/component/inbox-table/type";

// with status -> green
// without status -> blue
// without data -> grey

const ProgressBar = ({
  data = [],
  setSelectorMessage,
  selectedMessage,
}: {
  data?: Message[];
  setSelectorMessage: Function;
  selectedMessage: string | null;
}) => {
  let firstElement: Message | null = null;
  let lastElement: Message | null = null;
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

  const handleSelectMessage = (id: string | undefined) => {
    if (!id || selectedMessage === id) {
      setSelectorMessage(null);
    } else setSelectorMessage(id);
  };

  const isSelectedMessage = (id: string | undefined) =>
    !selectedMessage || id === selectedMessage;

  return (
    <StyledContainerProgressBar>
      <StyledContainerTitleProgressBar>
        <StyledTitleProgressBar>Seguimiento de Mensajes</StyledTitleProgressBar>
      </StyledContainerTitleProgressBar>
      <StyledContainerBar>
        <StyledContainerBlock isSelected={isSelectedMessage(firstElement?.id)}>
          {firstElement && (
            <StyledContainerBlockStatus
              onClick={() => handleSelectMessage(firstElement?.id)}
            >
              <StyledContainerIcon status={firstElement?.status}>
                {!getIsPendingStatus(firstElement?.status) && (
                  <StyledCheckIcon
                    fontSize="small"
                    iconColor={firstElement?.status}
                  />
                )}
              </StyledContainerIcon>
              <StyledTypographyCode>
                MS {firstElement?.messageCode}
              </StyledTypographyCode>
              <StyledTypographyStatus>
                {getStatusText(firstElement?.status, firstElement?.messageCode)}
              </StyledTypographyStatus>
            </StyledContainerBlockStatus>
          )}
          <StyledLinearProgress
            variant="determinate"
            value={firstElement ? 100 : 0}
            borderRadius="left"
            backgroundColor={
              getIsPendingStatus(firstElement?.status) ? "#00B2E2" : "#00BC70"
            }
            borderRight={!!firstElement}
          />
        </StyledContainerBlock>

        {insideElements.map((elem: any, i: number) => {
          const element = elem;
          const status = element?.status;
          return (
            <StyledContainerBlock
              isSelected={isSelectedMessage(element?.id)}
              key={`key-progress-block-${i}`}
            >
              {element && (
                <StyledContainerBlockStatus
                  onClick={() => handleSelectMessage(element?.id)}
                >
                  <StyledContainerIcon status={element?.status}>
                    {!getIsPendingStatus(status) && (
                      <StyledCheckIcon
                        fontSize="small"
                        iconColor={element?.status}
                      />
                    )}
                  </StyledContainerIcon>
                  <StyledTypographyCode>
                    MS {element?.messageCode}
                  </StyledTypographyCode>
                  <StyledTypographyStatus>
                    {getStatusText(element?.status, element?.messageCode)}
                  </StyledTypographyStatus>
                </StyledContainerBlockStatus>
              )}
              <StyledLinearProgress
                variant="determinate"
                value={element ? 100 : 0}
                borderRadius="center"
                backgroundColor={
                  getIsPendingStatus(status) ? "#00B2E2" : "#00BC70"
                }
                borderRight={!!element}
              />
            </StyledContainerBlock>
          );
        })}
        <StyledContainerBlock isSelected={isSelectedMessage(lastElement?.id)}>
          {lastElement && (
            <StyledContainerBlockStatus
              onClick={() => handleSelectMessage(lastElement?.id)}
            >
              <StyledContainerIcon status={lastElement?.status}>
                {!getIsPendingStatus(lastElement?.status) && (
                  <StyledCheckIcon
                    fontSize="small"
                    iconColor={lastElement?.status}
                  />
                )}
              </StyledContainerIcon>
              <StyledTypographyCode>
                MS {lastElement?.messageCode}
              </StyledTypographyCode>
              <StyledTypographyStatus>
                {getStatusText(lastElement?.status, lastElement?.messageCode)}
              </StyledTypographyStatus>
            </StyledContainerBlockStatus>
          )}

          <StyledLinearProgress
            variant="determinate"
            value={lastElement ? 100 : 0}
            borderRadius="right"
            backgroundColor={
              getIsPendingStatus(lastElement?.status) ? "#00B2E2" : "#00BC70"
            }
          />
        </StyledContainerBlock>
      </StyledContainerBar>
    </StyledContainerProgressBar>
  );
};

export default ProgressBar;
