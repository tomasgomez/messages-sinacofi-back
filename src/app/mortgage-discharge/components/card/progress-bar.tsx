import {
  StyledContainerProgressBar,
  StyledTitleProgressBar,
  StyledContainerBar,
  StyledContainerBlock,
  StyledContainerBlockStatus,
  StyledContainerIcon,
  StyledCheckIcon,
  StyledTypographyCode,
  StyledTypographyStatus,
  StyledLinearProgress,
} from "./styles";
import {
  getStatusText,
  getIsPendingStatus,
} from "@/utils/mortgage-discharge-utils";
import { Message } from "@/app/component/inbox-table/type";

const ProgressBar = ({
  data = [],
  setSelectorMessage,
  selectedMessage,
}: {
  data?: Message[];
  setSelectorMessage: Function;
  selectedMessage: string | null;
}) => {
  let blockList: any[] = [];

  if (data.length < 8) {
    const nullCount = 8 - data.length;
    blockList = [...data, ...new Array(nullCount).fill(null)];
  } else blockList = [...data];

  blockList = blockList.map((message, index) => {
    return {
      ...message,
      border:
        index === 0
          ? "left"
          : index !== blockList.length - 1
          ? "center"
          : "right",
    };
  });

  const handleSelectMessage = (id: string | undefined) => {
    if (!id || selectedMessage === id) {
      setSelectorMessage(null);
    } else setSelectorMessage(id);
  };

  const isSelectedMessage = (id: string | undefined) =>
    !selectedMessage || id === selectedMessage;

  return (
    <StyledContainerProgressBar>
      <StyledTitleProgressBar>Seguimiento de Mensajes</StyledTitleProgressBar>
      <StyledContainerBar>
        {blockList.map((elem: any, i: number) => {
          const status = elem?.status;
          const border = elem?.border;
          const messageCode = elem?.messageCode;
          const id = elem?.id;
          return (
            <StyledContainerBlock
              isSelected={isSelectedMessage(id)}
              key={`key-progress-block-${i}`}
            >
              {id && (
                <StyledContainerBlockStatus
                  onClick={() => handleSelectMessage(id)}
                >
                  <StyledContainerIcon status={status}>
                    {!getIsPendingStatus(status) && (
                      <StyledCheckIcon fontSize="small" iconColor={status} />
                    )}
                  </StyledContainerIcon>
                  <StyledTypographyCode>MS {messageCode}</StyledTypographyCode>
                  <StyledTypographyStatus>
                    {getStatusText(status, messageCode)}
                  </StyledTypographyStatus>
                </StyledContainerBlockStatus>
              )}
              <StyledLinearProgress
                variant="determinate"
                value={id ? 100 : 0}
                borderRadius={border}
                backgroundColor={
                  getIsPendingStatus(status) ? "#00B2E2" : "#00BC70"
                }
                borderRight={!!id}
              />
            </StyledContainerBlock>
          );
        })}
      </StyledContainerBar>
    </StyledContainerProgressBar>
  );
};

export default ProgressBar;
