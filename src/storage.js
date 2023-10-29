export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    alert(e.message);
  }
}

export function getStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);

    if (!item) return defaultValue;

    return JSON.parse(item);
  } catch (e) {
    alert(e.message);
    return defaultValue;
  }
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}
