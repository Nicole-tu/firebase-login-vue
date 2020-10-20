import { format, isValid, addDays, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns'

const formatDate = (date, formater) => {
  if (typeof formater == "undefined") {
    return format(new Date(date)).format("yyyy/MM/dd");
  }
  return format(new Date(date), formater)
}

const validDate = (date) => {
  return isValid(new Date(date));
}

const addDate = (date, addAmount) => {
  return addDays(new Date(date), addAmount);
}

const getDayPart = () => {
  let time = new Date();
  let g = null; //return g
  if (!time || !validDate(time)) {
    return;
  }
  let split_afternoon = 12; //24hr time to split the afternoon
  let split_evening = 17; //24hr time to split the evening
  let currentHour = parseFloat(formatDate(time, "HH"));
  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "Afternoon";
  } else if (currentHour >= split_evening) {
    g = "Evening";
  } else {
    g = "Morning";
  }
  return g;
}

const getQuarterMonth = (date) => {
  if (typeof date === "undefined") {
    return [format(startOfQuarter(new Date()), 'yyyy/MM'), format(endOfQuarter(new Date()), 'yyyy/MM')];
  }
  return [format(startOfQuarter(new Date(date)), 'yyyy/MM'), format(endOfQuarter(new Date(date)), 'yyyy/MM')];
}

const getThisYearMonth = (date) => {
  if (typeof date === "undefined") {
    return [format(startOfYear(new Date()), 'yyyy/MM'), format(endOfYear(new Date()), 'yyyy/MM')];
  }
  return [format(startOfYear(new Date(date)), 'yyyy/MM'), format(endOfYear(new Date(date)), 'yyyy/MM')];

}

export const dateControl = {
  formatDate,
  validDate,
  addDate,
  getDayPart,
  getQuarterMonth,
  getThisYearMonth
}
