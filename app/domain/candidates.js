const createCandidate = (
  getCities,
  persist
  ) => async (newCandidate) => {

  const cities = await getCities();
  const city = cities.find(item => item.city == newCandidate.city);
  const candidate = {
    ...newCandidate,
    coordinates: {
      lat: city ? city.lat : null,
      long: city ? city.long: null,
    }
  }
  return persist(candidate);

};

module.exports = {
  createCandidate,
};
