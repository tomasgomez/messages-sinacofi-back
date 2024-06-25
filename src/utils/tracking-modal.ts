export const getOnlyTheValue = (status: string) => {
  if (!status) return "";
  let partes = status.split("-");
  return partes[0].trim();
};

export const EnabledExtraOptions = (extraOptions: any, history?: any[]) => {
  if (Array.isArray(history) && history.length > 0) {
    const lastHistoryElem = history[0];
    // the lastHistoryElem is the most recent status
    let disabledOptions = [...extraOptions];

    disabledOptions.forEach((option, index) => {
      if (option?.dependOf.includes(getOnlyTheValue(lastHistoryElem?.status))) {
        disabledOptions[index].disabled = false;
      } else {
        disabledOptions[index].disabled = true;
      }
    });
    return disabledOptions;
  }
  return extraOptions;
};
