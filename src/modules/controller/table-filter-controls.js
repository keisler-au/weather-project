import React, { useContext } from 'react';

import { Context } from '../view/app';
import { filterData } from '../model/filtering-data';
import { wholeWeek } from '../view/template-variables';


export default function TableFilters({ table, filters }) {
    function selectCategory(tableCategories, labelText, checked) {
        if (labelText === 'deselectAll') {
            for (const category in tableCategories) {
                tableCategories[category] = checked ? true : false;
            }
        } else {
            tableCategories[labelText] = checked;
        }
  
        return tableCategories;
    }
    function selectedDays(labelText, allLabels, forecastedDays, checked) {
        if (labelText !== 'deselectAll') {
            let dayIndex;
            allLabels.forEach(labelElement => {
                dayIndex = labelElement.textContent === labelText 
                    ? allLabels.indexOf(labelElement) 
                    : dayIndex;
            });
            forecastedDays = forecastedDays.includes(dayIndex) 
                ? forecastedDays.filter(val => val !== dayIndex) 
                : [dayIndex, ...forecastedDays].sort();
        } else {
            forecastedDays = checked ? wholeWeek : [];
        }
  
        return forecastedDays;
    }
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
            });
        } else { 
            label.className = checked ? '' : 'input-unselected'; 
        }
        if (isCategory) {
            filteredCategories[table] = selectCategory(filteredCategories[table], labelText, checked);
            setFilteredCategories({ ...filteredCategories, [table]:filteredCategories[table] });
        } else {
            forecastedDays = selectedDays(labelText, allLabels, forecastedDays, checked);
            setForecastedDays(forecastedDays);
        }
        const filteredData = filterData(filteredCategories, data, forecastedDays);
        setFilteredData(filteredData);
    }
    
    let {
        data, 
        forecastedDays, 
        setForecastedDays, 
        filteredCategories,
        setFilteredCategories, 
        setFilteredData
    } = useContext(Context);
    const selectedInputs = filters.map(filter => (
        <label key={filter.toString()}>
            {(isNaN(filter) && filter) || (data.forecasted[filter].Date || 'Day ' + (filter + 1))}
            <input 
                type="checkbox"
                onChange={displayFilters}
                defaultChecked
            />
        </label>
    ));

    return selectedInputs;
}
