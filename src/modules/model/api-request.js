export function requestApi(param1, param2, location=false) {
    const url = location 
            ? `http://api.openweathermap.org/geo/1.0/direct?q=${param1},${param2}&appid=invalid_key`
            : `https://api.openweathermap.org/data/2.5/onecall?lat=${param1}&lon=${param2}&exclude=minutely,alerts&units=metric&appid=invalid_key`,
        request = fetch(url)
            .then(res => res.json())
            .catch(err => console.error('An Error occured in requestApi:', err));

    return request;
}
  
export async function getWeatherData() {
    const city = document.getElementById('city').value,
        country = document.getElementById('country').value;
  
    if (city) {
        try {
            const locationData = await exports.requestApi(city, country, true),
                weatherData = exports.requestApi(locationData[0].lat, locationData[0].lon);
            return weatherData;
        } catch(error) {
            if (error instanceof TypeError) { 
                console.log('The city that was searched for has no associated weather data:', error);
            } else { 
                console.error('An error occured in getWeatherData():', error); 
            }
        }
    }

    return null;
}

const exports = { requestApi };
export default exports;
