const getOnlyTheValue = (status: string) => {
  let partes = status.split("-");
  return partes[0].trim();
};

export const EnabledExtraOptions = (extraOptions: any, history?: any[]) => {
  if (history) {
    const lastHistoryElem = history[0];
    // the lastHistoryElem is the most recent status
    let disabledOptions = [...extraOptions];

    disabledOptions.forEach((option, index) => {
      if (getOnlyTheValue(lastHistoryElem?.status) === option?.dependOf) {
        disabledOptions[index].disabled = false;
      } else {
        disabledOptions[index].disabled = true;
      }
    });
    return disabledOptions;
  }
  return [];
};
