export const dayMonthYearWithSeparator = (
  dateToModifie: Date,
  separator: string,
  reverse: string = "no"
) => {
  const date = new Date(dateToModifie);
  const dayOfMonth = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const year = date.getFullYear();
  const modifiedDate =
    reverse === "yes"
      ? `${year}${separator}${month}${separator}${dayOfMonth}`
      : `${dayOfMonth}${separator}${month}${separator}${year}`;
  return modifiedDate;
};
export const hoursMinutesWithSeparator = (
  dateToModifie: Date,
  separator: string
) => {
  const date = new Date(dateToModifie);
  const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  return `${hours}${separator}${minutes}`;
};
export const slicedDayMonthYearWithSeparator = (
  stringDate: string,
  separator: string,
  reverse: string = "no"
) => {
  const dayOfMonth = stringDate.slice(6, 8);
  const month = stringDate.slice(4, 6);
  const year = stringDate.slice(0, 4);
  const modifiedDate =
    reverse === "yes"
      ? `${year}${separator}${month}${separator}${dayOfMonth}`
      : `${dayOfMonth}${separator}${month}${separator}${year}`;
  return modifiedDate;
};
