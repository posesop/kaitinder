const addYears = (initYear, years) => {
  const date = new Date();
  date.setFullYear(initYear + years);
  return new Date(date);
};

module.exports = {
  addYears,
};
