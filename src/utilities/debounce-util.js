/**
 * @param {(...args: any[]) => void} fn
 * @param {number} delay
 * @returns {(...args: any[]) => void}
 */
export const debounce = (fn, delay) => {
  let timeoutId = undefined;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      clearTimeout(timeoutId);
    }, delay);
  };
};
