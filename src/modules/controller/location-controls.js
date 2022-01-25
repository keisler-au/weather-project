import React, { useContext } from 'react';

import { Context } from '../view/app';
import { emptyDataTemplate } from "../view/template-variables";
import { filterData } from '../model/filtering-data';
import { getWeatherData } from '../model/api-request';
import { parseData } from '../model/parsing-data';


export default function LocationFilter({ location }) {
    const {
        setData, 
        daysIncluded, 
        filteredCategories, 
        setFilteredData
    } = useContext(Context);

    function textDebounce() {
      let timer;
      return ({ target }) => {
        target.className = target.value ? 'text-in-input' : ''; 
        const callback = async () => {
          clearTimeout(timer);
          const weatherData = await getWeatherData(),
          parsedData = weatherData ? parseData(weatherData) : emptyDataTemplate;
          setData(parsedData);
          const filteredData = filterData(filteredCategories, parsedData, daysIncluded);
          setFilteredData(filteredData);
        };
        
        clearTimeout(timer);
        timer = setTimeout(callback, 2000);
      };
    };
    
    const locationInput = 
      <label>
        {location}
        <input 
          type="text" 
          id={location.toLocaleLowerCase()}
          onChange={textDebounce()} 
          autoFocus={location === 'City'}
        />
      </label>;

    return locationInput
};
