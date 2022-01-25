import { emptyDataTemplate } from "../view/template-variables";


export function convertTempData(data, fahrenheitSelected=true) {
  const oldTemp = data.Temperature,
  newTemp = fahrenheitSelected
  ? Math.round(oldTemp * (9/5) + 32)
  : Math.round((oldTemp - 32) * (5/9)),
  convertedData = {
      ...data, 
      'Temperature': newTemp
  };

  return convertedData
}; 

export function getDateString(unixTime, time=true) {
  const date = new Date(unixTime * 1000),
  string =  time 
  ? date.toTimeString().substring(0, 5) 
  : date.toDateString().substring(0, 4) + date.toDateString().substring(8, 11)

  return string
};
  
export function parseData(data) {
    try {
      const { 
        timezone, 
        current: { 
          dt, 
          temp, 
          clouds, 
          rain, 
          wind_speed, 
          humidity, 
          weather: [{description}], 
          sunrise, 
          sunset 
        },
        daily 
      } = data,
      parsedData = { 
        location: {
          'Timezone': timezone, 
        },
        current: {
          'Date': getDateString(dt, false),
          'Time': getDateString(dt),
          'Temperature': Math.round(temp), 
          'Clouds': clouds,
          'Humidity': humidity,
          'Wind': Math.round(wind_speed * 1.943844),
          'Rain': typeof rain === 'number' ? rain : '-', 
          'Description': description[0].toUpperCase() + description.slice(1),
          'Sunrise': getDateString(sunrise),
          'Sunset': getDateString(sunset) 
        },
        daily: daily.map(day => ({
          'Date': getDateString(day.dt, false),
          'Temperature': Math.round(day.temp.day),  
          'Clouds': day.clouds,
          'Humidity': day.humidity,
          'Wind': Math.round(day.wind_speed * 1.943844),
          'Rain': typeof day.rain === 'number' ? day.rain : '-', 
          'Description': 
            day.weather[0].description[0].toUpperCase() + 
            day.weather[0].description.slice(1),
          'Sunrise': getDateString(day.sunrise),
          'Sunset': getDateString(day.sunset)
        }))          
      },
      fahrenheit = document.getElementById('fahrenheit').checked;
      if (fahrenheit) {
        parsedData.current = convertTempData(parsedData.current);
        parsedData.daily = parsedData.daily.map(dayData => convertTempData(dayData));
      }
      return parsedData
      
    } catch (error) {
        if (error instanceof TypeError) {
          console.log('Some data associated with the searched city is missing:', error);
        } else { 
          console.error('An error occured in parseData():', error)
        };
    };

    return emptyDataTemplate
};
