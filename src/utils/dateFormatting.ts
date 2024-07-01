import { format } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

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

export const getChileanTimeAsDate = (): Date => {
  const timezone = 'America/Santiago';
  const createdAt = new Date();
  
  const zonedTime = toZonedTime(createdAt, timezone);

  const formattedDateStr = formatInTimeZone(zonedTime, timezone, 'dd-MM-yyyy HH:mm:ss');

  if (!formattedDateStr) {
    return createdAt;
  }

  // Extract parts from the formatted date string
  const matchArray = formattedDateStr.match(/\d+/g);
  if (!matchArray || matchArray.length < 6) {
    return createdAt;
  }
  const [day, month, year, hour, minute, second] = matchArray.map(Number);

  // Create a new Date object with the extracted parts
  const formattedDate = new Date(year, month - 1, day, hour, minute, second);

  return formattedDate;
};