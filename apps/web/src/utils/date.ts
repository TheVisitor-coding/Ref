
/**
 * Verify if a given date string corresponds to today's date.
 * @param dateString 
 * @returns boolean
 */
function isToday(dateString: string | null): boolean {
  if (!dateString) return false;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const today = new Date();

  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
}

/**
 * Get the start of today in UTC.
 * @returns Date object set to the start of today (00:00:00.000 UTC)
 */
function getStartOfToday(): Date {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}

export {
    isToday,
    getStartOfToday
}