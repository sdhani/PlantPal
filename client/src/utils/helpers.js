export const getDateNeedsWater = (d, days) => {
  let lastWatered = new Date(d);
  let needsToBeWatered = lastWatered.setDate(lastWatered.getDate() + days);
  return new Date(needsToBeWatered);
};

export const getDateDifference = (last, next) => {
  const diff = next - last;
  const daysLeft = diff / (1000 * 60 * 60 * 24);
  return parseInt(daysLeft);
};

export const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
