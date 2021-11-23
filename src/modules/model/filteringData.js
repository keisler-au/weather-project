function convertTempData(data) {
    const celsius = data.Temperature.split(' ')[0],
    fahrenheit = Math.round( (celsius * (9/5) + 32) * 100 ) / 100,
    convertedData = {
        ...data, 
        'Temperature': fahrenheit + ' \u00B0F'
    };
    
    return convertedData
}; 
  
function filterData(filterStatus, data, daysIn=null) {
    const isData = daysIn===null ? data.Temperature : data[0].Temperature,
    
    headersIn = Object.keys(filterStatus).filter(header => filterStatus[header]===true),

    data = filterStatus.tempUnit === 'Fahrenheit' && isData
    ? daysIn && data.map( dayData => convertTempData(dayData) )
    || convertTempData(data) 
    : data,

    filteredData = daysIn === null 
    ? Object.fromEntries(headersIn.map( header => [header, data[header]] ))
    : daysIn.map( day => Object.fromEntries(headersIn.map( header => [header, data[day][header]] )))

    return filteredData
}; 

export { convertTempData, filterData };