const localStorageUtils = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem: (key) => {
    const result = localStorage.getItem(key);

    return JSON.parse(result);
  },
};

export default localStorageUtils;
