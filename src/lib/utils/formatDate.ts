const formatDate = (date: Date, format: string) => {
  const formatMonth = (month: number) => (month < 10 ? `0${month}` : month.toString());
  const formatDay = (day: number) => (day < 10 ? `0${day}` : day.toString());
  const map: { [key: string]: string } = {
    mm: formatMonth(date.getMonth() + 1),
    dd: formatDay(date.getDate()),
    yyyy: date.getFullYear().toString()
  };

  return format.replace(/yyyy|mm|dd/gi, (matched) => map[matched]);
};

export { formatDate };