export default function getEveningStatus(date, isMilitary) {
  return !isMilitary && date.getHours() >= 12;
}
