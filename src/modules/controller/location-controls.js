import React, { useContext } from 'react';

import { Context } from '../view/app';
import { emptyDataTemplate } from '../view/template-variables';
import { filterData } from '../model/filtering-data';
import { getWeatherData } from '../model/api-request';
import { parseData } from '../model/parsing-data';


export default function LocationFilter({ location }) {
    async function debounceRetrieveData () {
        const weatherData = await getWeatherData(),
            parsedData = weatherData ? parseData(weatherData) : emptyDataTemplate;
        setData(parsedData);
        const filteredData = filterData(filteredCategories, parsedData, forecastedDays);
        setFilteredData(filteredData);
    }
    function textDebounce() {
        let timer;
        return () => {
            const callback = () => {
                clearTimeout(timer);
                debounceRetrieveData();
            };
            clearTimeout(timer);
            timer = setTimeout(callback, 2000);
        };
    }
    const { setData, 
            forecastedDays, 
            filteredCategories, 
            setFilteredData
        } = useContext(Context),
        locationInput = 
            <label>
                {location}
                <input 
                    type="text" 
                    id={location.toLocaleLowerCase()}
                    onChange={textDebounce()} 
                    autoFocus={location === 'City'}
                />
            </label>;

    return locationInput;
}
