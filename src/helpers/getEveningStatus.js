export default function getEveningStatus(date, isHour, isMilitary) {
  return isHour && !isMilitary && date.getHours() >= 12;
}
