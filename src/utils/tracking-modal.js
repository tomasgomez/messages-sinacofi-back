const getOnlyTheValue = (status) => {
  let partes = status.split("-");
  return partes[0].trim();
};

export const EnabledExtraOptions = (extraOptions = [], history = []) => {
  let disabledOptions = [...extraOptions];

  history.forEach((element) => {
    let status = getOnlyTheValue(element.status);
    disabledOptions.forEach((option, index) => {
      if (status === option?.dependOf) {
        disabledOptions[index].disabled = false;
      }
    });
  });
  return disabledOptions;
};
