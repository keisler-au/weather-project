function getUrl(param1, param2, location=false) {
  const url = location 
  ? `http://api.openweathermap.org/geo/1.0/direct?q=${param1},${param2}&appid=410fd56e8e5c7d0fd3399015060b1dd0`
  : `https://api.openweathermap.org/data/2.5/onecall?lat=${param1}&lon=${param2}&exclude=minutely,alerts&units=metric&appid=410fd56e8e5c7d0fd3399015060b1dd0`;

  return url
};
  
function requestApi(url) {
  const request = fetch(url).then(res => res.json())
  .catch(err => console.log('An Error occured in callApi:', err))

  return request
};
  
async function getWeatherData() {
  const city = document.querySelector('[name=City]').value,
  country = document.querySelector('[name=Country]').value;
  
  if (city) {
    try {
      const locationUrl = getUrl(city, country, true),
      location = await requestApi(locationUrl),
      weatherUrl = getUrl(location[0].lat, location[0].lon);

      return requestApi(weatherUrl)

    } catch(error) {
      if (error instanceof TypeError) { 
        console.log('The city that was searched for has no associated weather data:', error);
      } else { 
        console.log('An error occured in getWeatherData():', error); 
      };
    };
  };

  return null 
};


export { 
  getUrl, 
  requestApi, 
  getWeatherData
};

// *Data provided by OpenWeather API's*
  // geoData = API that provides longditude and latitude coordinates
  // weatherData = API that provides weather information based on geographical coordinates
// *Limit API calls to no more than once in 10 minutes for each location
// Update frequency no higher than once in 10 minutes*