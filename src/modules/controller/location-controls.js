import React, { useContext } from 'react';

import { Context, emptyDataTemplate } from '../view/app';
import { filterData } from '../model/filtering-data';
import { getWeatherData } from '../model/api-request';
import { Inputs } from './input-template';
import { parseData } from '../model/parsing-data';


function LocationInput({ location }) {
    const {
        setData, 
        daysIncluded, 
        filteredCategories, 
        setFilteredData
    } = useContext(Context);

    function textDebounce({ target }) {
      let timer;
      return () => {
        target.className = target.value ? 'text-in-input' : ''; 
        const callback = async () => {
          // !! make sure this is only being called once, not after each letter
          console.log('bb')
          clearTimeout(timer);
          const weatherData = await getWeatherData(),
          parsedData = weatherData ? parseData(weatherData) : emptyDataTemplate;
          setData(parsedData);
          setFilteredData(filterData(filteredCategories, parsedData, daysIncluded));
        };
        clearTimeout(timer);
        console.log('aa')
        timer = setTimeout(callback, 2000);
      };
    };

    const locationInput = <exports.Inputs 
      type="text"
      label={location}
      handler={(event) => textDebounce(event)()}
      autoFocus={location === 'City'}
    />

    return locationInput
};


const exports = { LocationInput, Inputs };
export default exports;
export { LocationInput };