export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const monthOptions = monthNames.map((item) => ({
  label: item,
  value: item,
}));
export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));
