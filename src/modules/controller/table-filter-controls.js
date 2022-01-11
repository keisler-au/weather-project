import React, { useContext } from "react";

import { Context, wholeWeek } from "../view/app";
import { filterData } from "../model/filtering-data";


export default function TableFilters({ table, filterOptions }) {
  let {
    data, 
    daysIncluded, 
    setDaysIncluded, 
    filteredCategories,
    setFilteredCategories, 
    setFilteredData
  } = useContext(Context);

  function displayFilters({ target: { checked, parentElement } }) {
    const isDeselectAll = parentElement.textContent === 'deselect',
    isCategory = parentElement.parentElement.textContent.includes('Categories'),
    allInputs = [...parentElement.parentElement.children];
    allInputs.shift();
    
    if (isDeselectAll) {
      allInputs.forEach(element => {
        element.firstElementChild.checked = checked;
        element.className = checked ? '' : 'input-unselected';
      })
    } else {
      parentElement.className = checked ? '' : 'input-unselected';
    }

    if (isCategory && isDeselectAll) {
      for (const category in filteredCategories[table]) {
        filteredCategories[table][category] = checked ? true : false;
      };
    } else if (isCategory) {
      filteredCategories[table] = {
        ...filteredCategories[table], 
        [parentElement.textContent]: checked
      }
    } else if (isDeselectAll) {
      daysIncluded = checked ? wholeWeek : [];
    }
    else {
      let dayIndex;
      allInputs.forEach(element => {
        dayIndex = element.textContent === parentElement.textContent 
        ? allInputs.indexOf(element) 
        : dayIndex;
      });
      daysIncluded = daysIncluded.includes(dayIndex) 
      ? daysIncluded.filter(val => val !== dayIndex) 
      : [dayIndex, ...daysIncluded].sort();
    };

    isCategory 
    ? setFilteredCategories(pre => ({ ...pre, [table]:filteredCategories[table] }))
    : setDaysIncluded(daysIncluded);

    setFilteredData(filterData(filteredCategories, data, daysIncluded));
  };
  
  const selectedInputs = filterOptions.map(filter => (
    <label key={filter.toString()}>
      {(isNaN(filter) && filter) || (data.daily[filter].Date || 'Day ' + (filter + 1))}
      <input 
        type="checkbox"
        onChange={displayFilters}
        defaultChecked
      />
    </label>
  ));

  return selectedInputs
};
