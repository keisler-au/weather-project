import {emptyDataTemplate} from './App'


function getDateString(unixTime, time=true) {
    let date = new Date(unixTime * 1000);
    return time ? date.toTimeString().substr(0, 8) 
    : date.toDateString().substr(0, 4) + date.toDateString().substr(8, 3)
};
  
function parseData(data) {
    try {
      const { timezone, lat, lon, current: { dt, temp, clouds, rain, wind_speed, humidity, weather: [{description}], sunrise, sunset }, daily } = data;
      return { 
        location: {'Timezone': timezone, 'Latitude': lat, 'Longditude': lon},
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
          'Sunset': getDateString(sunset) },
        daily: daily.map(day => {
          const description = day.weather[0].description;
          return {
            'day': getDateString(day.dt, false),
            'Temperature': day.temp.day + ' \u00B0C',  
            'Clouds': day.clouds + '%',
            'Rain': typeof day.rain === 'number' ? day.rain + ' mm' : 'None', 
            'Wind': (Math.round((day.wind_speed * 1.943844) * 100) / 100) + ' kn',
            'Humidity': day.humidity + '%',
            'Description': description[0].toUpperCase() + description.slice(1),
            'Sunrise': getDateString(day.sunrise),
            'Sunset': getDateString(day.sunset)
          } })           
      }; 
    } catch (error) {
        if (error instanceof TypeError) {
          console.log('Some data associated with the searched city is missing:', error);
        } else { console.log('An error occured in parseData():', error)};
    };
    return emptyDataTemplate
};

function convertTempData(data) {
    const celsius = data.Temperature.split(' ')[0];
    return {...data, 'Temperature': Math.round((celsius * (9/5) + 32) * 100) / 100 + ' \u00B0F'}
}; 
  
function filterData(filters, data, daysIn=null) {
    data = filters.tempUnit==='Fahrenheit' 
    && (daysIn===null ? data.Temperature : data[0].Temperature)
    ? ( daysIn && data.map(dayData => convertTempData(dayData)) ) || convertTempData(data) 
    : data;
    const headersIn = Object.keys(filters).filter(header => filters[header]===true);
    return daysIn === null ? Object.fromEntries( headersIn.map(header => [header, data[header]]) )
    : daysIn.map( day => Object.fromEntries( headersIn.map(header => [header, data[day][header]]) ))
}; 
  

export {getDateString, convertTempData, filterData, parseData}