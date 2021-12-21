import React, { useContext } from "react";

import { Context, wholeWeek } from "../view/app";
import { Inputs } from "./input-template";
import { filterData } from "../model/filtering-data";


function Days() {
  const {
    data, 
    daysIncluded, 
    setDaysIncluded, 
    filteredCategories, 
    setFilteredData
  } = useContext(Context);

  function daysToDisplay({ target: { checked, parentElement } }) {
    let newDays;
    const fieldsetChildren = [...parentElement.parentElement.children];
    fieldsetChildren.shift();
    if (parentElement.textContent === 'deselect') {
      fieldsetChildren.forEach(element => {
        element.className = !checked ? 'input-unselected' : '';
        element.children[0].checked = checked;
      });

      newDays = parentElement.className ? [] : wholeWeek;
    } 
    else {
      parentElement.className = !checked ? 'input-unselected' : '';

      let dayOfWeek;
      fieldsetChildren.forEach(element => {
        dayOfWeek = element.textContent === parentElement.textContent 
        ? fieldsetChildren.indexOf(element) 
        : dayOfWeek;
      });
      newDays = daysIncluded.includes(dayOfWeek) 
      ? daysIncluded.filter(val => val !== dayOfWeek) 
      : [dayOfWeek, ...daysIncluded].sort();
    }
  
    setDaysIncluded(newDays)
    setFilteredData(pre => (
      {
        ...pre,
        'daily': filterData(filteredCategories, data, newDays, ['daily']).daily 
      }
    ));
  };
  
  const filteredDays = [...wholeWeek, 'deselect'].map(day => (
    <label key={day.toString()}>
      {(day === 'deselect' && day) || (data.daily[day].Date || 'Day ' + (day + 1))}
      <input 
        type="checkbox"
        onChange={daysToDisplay}
        defaultChecked
      />
    </label>
  ));

  return filteredDays
};


const exports = { Days, Inputs };
export default exports;
export { Days };