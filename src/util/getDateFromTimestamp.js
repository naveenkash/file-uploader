function getDateFromTimestamp(timestamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let d = new Date(timestamp);
  const todayDate = `${
    months[d.getMonth()]
  } ${d.getDate()},  ${d.getFullYear()}`;
  return todayDate;
}
export default getDateFromTimestamp;
