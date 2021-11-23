import { emptyDataTemplate } from './app';


function getDateString(unixTime, time=true) {
    const date = new Date(unixTime * 1000),
    toString =  time 
    ? date.toTimeString().substr(0, 8) 
    : date.toDateString().substr(0, 4) + date.toDateString().substr(8, 3)

    return toString
};
  
function parseData(data) {
    try {
      const { 
        timezone, 
        lat, 
        lon, 
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
          'Latitude': lat, 
          'Longditude': lon
        },
        current: {
          'Date': getDateString(dt, false),
          'Time': getDateString(dt),
          'Temperature': temp + ' \u00B0C', 
          'Clouds': clouds + '%',
          'Rain': typeof rain === 'number' ? rain + ' mm' : 'None', 
          'Wind': (Math.round((wind_speed * 1.943844) * 100) / 100) + ' kn',
          'Humidity': humidity + '%',
          'Description': description[0].toUpperCase() + description.slice(1),
          'Sunrise': getDateString(sunrise),
          'Sunset': getDateString(sunset) 
        },
        daily: daily.map(day => {
          const description = day.weather[0].description,
          daysData = {
            'day': getDateString(day.dt, false),
            'Temperature': day.temp.day + ' \u00B0C',  
            'Clouds': day.clouds + '%',
            'Rain': typeof day.rain === 'number' ? day.rain + ' mm' : 'None', 
            'Wind': (Math.round((day.wind_speed * 1.943844) * 100) / 100) + ' kn',
            'Humidity': day.humidity + '%',
            'Description': description[0].toUpperCase() + description.slice(1),
            'Sunrise': getDateString(day.sunrise),
            'Sunset': getDateString(day.sunset)
          };
          return daysData
        })           
      }; 

      return parsedData
      
    } catch (error) {
        if (error instanceof TypeError) {
          console.log('Some data associated with the searched city is missing:', error);
        } else { 
          console.log('An error occured in parseData():', error)
        };
    };

    return emptyDataTemplate
};

  

export { getDateString, parseData };