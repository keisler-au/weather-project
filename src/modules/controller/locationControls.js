import React, { useContext } from 'react';

import { Context } from '../../view/app';
import { filterData } from '../../model/filteringData';
import { getWeatherData } from '../../parsingData';


export function LocationInputs() {
    const {
        setData, 
        daysIncluded, 
        filters, 
        setFilteredData
    } = useContext(Context);

    function textDebounce() {
      let timer;
      
      return () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          clearTimeout(timer);
          const weatherData = await getWeatherData(),
          parsedData = weatherData ? parseData(weatherData) : emptyDataTemplate;
          setData(parsedData);
          setFilteredData({
            'current': filterData(filters.current, parsedData.current),
            'daily': filterData(filters.daily, parsedData.daily, daysIncluded)
          });
        }, 2000);
      };
    };

    const locationInputs = ['City', 'Country'].map(location => {
      return <Inputs key={location}
        type="text"
        label={location}
        handler={textDebounce()}
        autoFocus={location === 'City'}
      />
    });

    return locationInputs
};
