import React, { useContext } from "react";

import { Context } from "../view/app";
import { filterData } from "../model/filtering-data";
import { wholeWeek } from "../view/template-variables";


export default function TableFilters({ table, filterOptions }) {
  let {
    data, 
    daysIncluded, 
    setDaysIncluded, 
    filteredCategories,
    setFilteredCategories, 
    setFilteredData
  } = useContext(Context);

  function selectCategory(tableCategories, labelText, checked) {
    if (labelText === 'deselectAll') {
      for (const category in tableCategories) {
        tableCategories[category] = checked ? true : false;
      };
    } else {
      tableCategories[labelText] = checked
    }
  
    return tableCategories
  };
  
  function selectedDays(labelText, allLabels, daysIncluded, checked) {
    if (labelText !== 'deselectAll') {
      let dayIndex;
      allLabels.forEach(labelElement => {
        dayIndex = labelElement.textContent === labelText 
        ? allLabels.indexOf(labelElement) 
        : dayIndex;
      });
      daysIncluded = daysIncluded.includes(dayIndex) 
        ? daysIncluded.filter(val => val !== dayIndex) 
        : [dayIndex, ...daysIncluded].sort();
    } else {
      daysIncluded = checked ? wholeWeek : [];
    }
  
    return daysIncluded
  };

  function displayFilters({ target: { checked, parentElement } }) {
    const label = parentElement,
    labelText = label.textContent,
    isCategory = label.parentElement.textContent.includes('Categories'),
    allLabels = [...label.parentElement.children];
    allLabels.shift();

    if (labelText === 'deselectAll') {
      allLabels.forEach(label => {
        label.className = checked ? '' : 'input-unselected';
        label.firstElementChild.checked = checked;
      })
    } else { label.className = checked ? '' : 'input-unselected'; }

    if (isCategory) {
      filteredCategories[table] = selectCategory(filteredCategories[table], labelText, checked);
      setFilteredCategories({ ...filteredCategories, [table]:filteredCategories[table] })
    } else {
      daysIncluded = selectedDays(labelText, allLabels, daysIncluded, checked);
      setDaysIncluded(daysIncluded);
    }
    const filteredData = filterData(filteredCategories, data, daysIncluded);
    setFilteredData(filteredData);
  };
  
  const selectedInputs = filterOptions.map(option => (
    <label key={option.toString()}>
      {(isNaN(option) && option) || (data.daily[option].Date || 'Day ' + (option + 1))}
      <input 
        type="checkbox"
        onChange={displayFilters}
        defaultChecked
      />
    </label>
  ));

  return selectedInputs
};
