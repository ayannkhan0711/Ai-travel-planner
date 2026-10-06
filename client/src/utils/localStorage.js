export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`vl_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`vl_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set failed:', e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(`vl_${key}`);
    } catch (e) {}
  },
};
