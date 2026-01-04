
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

function formatDate(date: Date): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];

  return `${dayName} ${dayNumber} ${monthName}`;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

/**
 * Format a Date to ISO date string (YYYY-MM-DD) using local timezone.
 */
function formatDateToISO(date?: Date): string {
  const d = date ?? new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format a Date to time string (HH:mm) using local timezone.
 */
function formatTimeToHHMM(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Format time string (HH:mm) to Strapi format (HH:mm:ss.000).
 */
function formatTimeForStrapi(time: string): string {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}:00.000`;
}

/**
 * Get the next day from a date string (YYYY-MM-DD).
 */
function getNextDay(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  date.setDate(date.getDate() + 1);
  return formatDateToISO(date);
}

/**
 * Format a week range for display (e.g., "Du 1 → 7 janv 2026").
 */
function formatWeekRange(startDate: Date): string {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'short' });
  const yearFormatter = new Intl.DateTimeFormat('fr-FR', { year: 'numeric' });

  const startMonth = monthFormatter.format(startDate);
  const endMonth = monthFormatter.format(endDate);
  const year = yearFormatter.format(endDate);

  if (startDate.getMonth() === endDate.getMonth()) {
    return `Du ${startDay} → ${endDay} ${startMonth} ${year}`;
  }

  return `Du ${startDay} ${startMonth} → ${endDay} ${endMonth} ${year}`;
}

/**
 * Format a day date for display (e.g., "4 janv. 2026").
 */
function formatDayDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(date);
}

export {
  isToday,
  getStartOfToday,
  formatDate,
  getWeekStart,
  formatDateToISO,
  formatTimeToHHMM,
  formatTimeForStrapi,
  getNextDay,
  formatWeekRange,
  formatDayDate,
}
