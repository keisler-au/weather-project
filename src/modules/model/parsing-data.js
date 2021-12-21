import { emptyDataTemplate } from "../view/app";
import { convertTempData } from "../controller/temperature-controls";

function getDateString(unixTime, time=true) {
    const date = new Date(unixTime * 1000),
    string =  time 
    ? date.toTimeString().substring(0, 5) 
    : date.toDateString().substring(0, 4) + date.toDateString().substring(8, 3)

    return string
};
  
function parseData(data) {
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
          'Date': exports.getDateString(dt, false),
          'Time': exports.getDateString(dt),
          'Temperature': Math.round(temp), 
          'Clouds': clouds,
          'Humidity': humidity,
          'Wind': Math.round(wind_speed * 1.943844),
          'Rain': typeof rain === 'number' ? rain : '-', 
          'Description': description[0].toUpperCase() + description.slice(1),
          'Sunrise': exports.getDateString(sunrise),
          'Sunset': exports.getDateString(sunset) 
        },
        daily: daily.map(day => {
          const description = day.weather[0].description,
          daysData = {
            'Date': exports.getDateString(day.dt, false),
            'Temperature': Math.round(day.temp.day),  
            'Clouds': day.clouds,
            'Humidity': day.humidity,
            'Wind': Math.round(day.wind_speed * 1.943844),
            'Rain': typeof day.rain === 'number' ? day.rain : '-', 
            'Description': description[0].toUpperCase() + description.slice(1),
            'Sunrise': exports.getDateString(day.sunrise),
            'Sunset': exports.getDateString(day.sunset)
          };
          return daysData
        })           
      },

      fahrenheit = document.querySelectorAll('[name=temp]')[1].checked;
      if (fahrenheit) {
        parsedData.current = convertTempData(parsedData.current, fahrenheit);
        parsedData.daily = parsedData.daily.map(dayData => convertTempData(dayData, fahrenheit));
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

const exports = { getDateString, parseData };
export default exports;
export { getDateString, parseData };