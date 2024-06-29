export const getDateFromDateString = (date: Date): string => {
  try {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}-${date.getFullYear()}`
  } catch (e) {
    return '';
  }
}

export const getTimeFromDateString = (date: Date): string => {
  try {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}${minutes}${seconds}`
  } catch (e) {
    return '';
  }
}
