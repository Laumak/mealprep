/**
 * Navigate to specified URL.
 * Extracted to a package to avoid changing the navigation API
 * if React's context API changes.
 *
 * @param {string} url - URL to navigate to.
 * @param {object} context - React context with react-router v4 router.
 */
const navigate = (url, { router }) => router.history.push(url);

export default navigate;
