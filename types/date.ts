export function isDateInPast(date: Date) {
  return date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
}

export function isDateInPresent(date: Date) {
  return date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
}

export function isDateInFuture(date: Date) {
  return date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
}

export function daysUntilDate(date: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(
    (date.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / oneDay
  );
}
