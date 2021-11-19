import React, {useContext} from 'react'

import {Context, wholeWeek, emptyDataTemplate, categoryTemplate} from './App'
import {getWeatherData} from './call-API'
import {parseData, filterData} from './manipulate-data'


function Fieldsets({header, element}) {
    return (
      <fieldset>
        <legend>{header}</legend>
        {element}
      </fieldset>
    )
  }
  
  function Inputs({label, type, name, checked, handler, autoFocus}) {
    return (
      <label>{label}:
        <input type={type ||'checkbox'} 
          name={name+1 || label} 
          checked={checked} 
          onChange={handler} 
          autoFocus={autoFocus}/>
      </label>
    )
  };
  
  function LocationInputs() {
    const {setData, daysIncluded, filters, setFilteredData} = useContext(Context); 
    function textDebounce() {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          clearTimeout(timer);
          const weatherData = await getWeatherData(),
          parsedData = weatherData ? parseData(weatherData) : emptyDataTemplate;
          setData(parsedData);
          setFilteredData({'current': filterData(filters.current, parsedData.current),
          'daily': filterData(filters.daily, parsedData.daily, daysIncluded)});
        }, 2000);
      };
    };
    return ['City', 'Country'].map(location => {
      return <Inputs key={location}
        type="text"
        label={location}
        handler={textDebounce()}
        autoFocus={location === 'City'}
      />
    });
  };
  
  function OptionalInputs() {
    const categories = Object.keys(categoryTemplate)
    return ( 
      [['Unit measurements', <TemperatureUnits />],
      ['div', 'Only include (categories selected)'],
      ['"Current Weather" table', 
        <Categories table="current" categories={['Date', 'Time', ...categories]} />],
      ['"8 Day Forecast" table', 
        <Categories table="daily" categories={categories} />],
      ['div', 'Only include (days selected)'],
      ['"8 Day Forecast" table', <IncludeDays />]]
      .map(([header, element], i) => {
        return header === 'div' 
          ? <div key={i.toString()}>{element}</div>
          : <Fieldsets key={i.toString()} header={header} element={element} />
      })
    )
  }
  
  function TemperatureUnits() {
    const {data, daysIncluded, filters, setFilters, setFilteredData} = useContext(Context);
    function changeUnit() {
      const unit = filters.current.tempUnit === 'Fahrenheit' ? 'Celsius' : 'Fahrenheit';
      setFilters(pre => { return {'current': {...pre.current, 'tempUnit': unit}, 
      'daily': {...pre.daily, 'tempUnit': unit} } });
      setFilteredData({'current': filterData({...filters.current, 'tempUnit': unit}, data.current),'daily': filterData({...filters.daily, 'tempUnit': unit}, data.daily, daysIncluded)});
    };
    return ['Celsius', 'Fahrenheit'].map(unit => {
      return <Inputs key={unit}
        type="radio"
        label={unit}
        name="unit"
        checked={unit === filters.current.tempUnit}
        handler={changeUnit}
      />
    });
  };
  
  function Categories({table, categories}) {
    const {data, daysIncluded, filters, setFilters, setFilteredData} = useContext(Context);
    function categoryDisplay({target: {name, checked}}) {
      setFilters(pre => { return {...pre, [table]: {...pre[table], [name]:checked}} });
      setFilteredData(pre => {
        return {...pre, [table]: filterData({...filters[table], [name]: checked}, data[table],
          ((table === 'daily' && daysIncluded) || null)) }
      });
    };
    return categories.map(category => {
      return <Inputs key={category}
        label={category} 
        checked={filters[table][category]}
        handler={categoryDisplay} 
      />
    });
  };
  
  function IncludeDays() {
    const {data, daysIncluded, setDaysIncluded, filters, setFilteredData} = useContext(Context);
    function daysDisplay({target: {name}}) {
      const day = parseInt(name) - 1,
      newDays = daysIncluded.includes(day) 
      ? daysIncluded.filter(val => val !== day) 
      : [day, ...daysIncluded].sort();
      setDaysIncluded(newDays)
      setFilteredData(pre => { 
        return {...pre, 'daily': filterData(filters.daily,  data.daily, newDays)} 
      });
    };
    return wholeWeek.map(day => {
      return <Inputs key={day.toString()}
        label={data.daily[day].day || 'Day ' + (day + 1)} 
        name={day}
        checked={daysIncluded.includes(parseInt(day))}
        handler={daysDisplay} 
      />
    });
  }
  

  export {Fieldsets, Inputs, LocationInputs, OptionalInputs, TemperatureUnits, Categories, IncludeDays}