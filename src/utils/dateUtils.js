const dateUtils = {
  formatDate: (date, pattern = "yyyy-MM-DD") => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    pattern = pattern.replace("yyyy", year);
    pattern = pattern.replace("DD", day);
    pattern = pattern.replace("MM", month);

    return pattern;
  },

};

export default dateUtils;
