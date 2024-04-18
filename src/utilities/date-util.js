/**
 * @param {string | Date} to
 * @param {string | Date} [from]
 * @return {string}
 */
export const computeTimeAgo = (to, from = new Date()) => {
  const toDate = new Date(to);
  const fromDate = new Date(from);
  const seconds = (fromDate.getTime() - toDate.getTime()) / 1000;
  const minutes = Math.floor(seconds / 60);

  if (Number.isNaN(minutes)) {
    return 'NaN';
  } else if (seconds < 0) {
    console.warn('from should not be less than to');
    return 'ERROR';
  } else {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let [unit, amount] = ['', 0];

    if (years > 0) {
      unit = 'year';
      amount = years;
    } else if (months > 0) {
      unit = 'month';
      amount = months;
    } else if (weeks > 0) {
      unit = 'week';
      amount = weeks;
    } else if (days > 0) {
      unit = 'day';
      amount = days;
    } else if (hours > 0) {
      unit = 'hour';
      amount = hours;
    } else if (minutes > 3) {
      unit = 'minute';
      amount = minutes;
    } else {
      return 'Just now';
    }

    // Pluralization
    if (amount > 1) {
      unit += 's';
    }

    return `${amount} ${unit} ago`;
  }
};
