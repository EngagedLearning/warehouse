/*
 * Tests if localStorage is available. There are a number of interesting cases
 * to consider across browsers. Rather than just checking the property it's
 * important to actually test setItem due to some behavior of Safari in previous
 * versions.
 *
 * Reference:
 * https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
 */
export const isLocalStorageSupported = () => {
  try {
    const testKey = `enlearn.localStorageSupportTest`;
    window.localStorage.setItem(testKey, "");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
};
