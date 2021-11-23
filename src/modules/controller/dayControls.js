import React, { useContext } from 'react'

import { Context, wholeWeek } from '../../view/app'
import { filterData } from '../../model/filteringData'


export function Days() {
    const {
      data, 
      daysIncluded, 
      setDaysIncluded, 
      filterStatus, 
      setFilteredData
    } = useContext(Context);
  
    function daysToDisplay({ target: { name } }) {
      const day = parseInt(name) - 1,
      newDays = daysIncluded.includes(day) 
      ? daysIncluded.filter(val => val !== day) 
      : [day, ...daysIncluded].sort();

      setDaysIncluded(newDays)
      setFilteredData(pre => { 
        const filteredData = {
          ...pre, 
          'daily': filterData(filterStatus.daily,  data.daily, newDays)
        };
        return filteredData 
      });
    };
  
    const filteredDays = wholeWeek.map(day => {
      return <Inputs key={day.toString()}
        label={data.daily[day].day || 'Day ' + (day + 1)} 
        name={day}
        checked={daysIncluded.includes(parseInt(day))}
        handler={daysToDisplay} 
      />
    });
  
    return filteredDays
  };