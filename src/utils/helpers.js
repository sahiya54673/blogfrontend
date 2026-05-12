/**
 * Format a date string into a human-readable format.
 * @param {string} dateString - ISO date string
 * @returns {string} e.g. "May 6, 2026"
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Truncate text to a given length and append ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 150) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Get error message from an axios error response.
 * @param {any} error
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || 'An unexpected error occurred';
};

/**
 * Estimate reading time based on word count (avg 200 words per minute).
 * @param {string} text
 * @returns {string} e.g. "3 min read"
 */
export const calculateReadTime = (text) => {
  if (!text) return '1 min read';
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return `${minutes} min read`;
};
