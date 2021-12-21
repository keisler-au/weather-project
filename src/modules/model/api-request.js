function getUrl(param1, param2, location=false) {
  const url = location 
  ? `http://api.openweathermap.org/geo/1.0/direct?q=${param1},${param2}&appid=410fd56e8e5c7d0fd3399015060b1dd0`
  : `https://api.openweathermap.org/data/2.5/onecall?lat=${param1}&lon=${param2}&exclude=minutely,alerts&units=metric&appid=410fd56e8e5c7d0fd3399015060b1dd0`;

  return url
};
  
function requestApi(url) {
  const request = fetch(url)
  .then(res => res.json())
  .catch(err => console.error('An Error occured in requestApi:', err))

  return request
};
  
async function getWeatherData() {
  const city = document.querySelector('form > label:first-child > input').value,
  country = document.querySelector('form > div > label:first-child > input').value;
  
  if (city) {
    try {
      const locationUrl = exports.getUrl(city, country, true),
      location = await exports.requestApi(locationUrl),
      weatherUrl = exports.getUrl(location[0].lat, location[0].lon),
      weatherData = exports.requestApi(weatherUrl);
      
      return weatherData

    } catch(error) {
      if (error instanceof TypeError) { 
        console.log('The city that was searched for has no associated weather data:', error);
      } else { 
        console.error('An error occured in getWeatherData():', error); 
      };
    };
  };

  return null
};


const exports = {
  getUrl, 
  requestApi, 
  getWeatherData
};
export default exports;
export { 
  getUrl, 
  requestApi, 
  getWeatherData
};
