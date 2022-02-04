import React, { useContext } from 'react';

import { Context } from '../view/app';
import { convertTempData } from '../model/parsing-data';
import { emptyDataTemplate } from '../view/template-variables';
import { filterData } from '../model/filtering-data';



export default function Temperatures() {
    function changeTempUnit() {  
        const celsius = document.getElementById('celsius'),
            fahren = document.getElementById('fahrenheit');        
        celsius.parentElement.className = celsius.checked ? 'input-selected' : 'input-unselected';
        fahren.parentElement.className = fahren.checked ? 'input-selected' : 'input-unselected';

        const dataOnDisplay = JSON.stringify(data) !== JSON.stringify(emptyDataTemplate);
        if (dataOnDisplay) {
            const fahrenheitSelected = fahren.checked;
            data.current = convertTempData(data.current, fahrenheitSelected);
            data.forecasted = data.forecasted.map(dayData => convertTempData(dayData, fahrenheitSelected));
        }
        const filteredData = filterData(filteredCategories, data, forecastedDays);
        setFilteredData(filteredData);
    }
    const {
            data, 
            forecastedDays, 
            filteredCategories, 
            setFilteredData
        } = useContext(Context),
        tempInputs = ['Celsius', 'Fahrenheit'].map(unit => (
            <label key={unit} >
                {unit}
                <input 
                    type="radio" 
                    id={unit.toLocaleLowerCase()}
                    name="temp"
                    onChange={changeTempUnit} 
                    defaultChecked={unit === 'Celsius'}
                />
            </label>
        ));

    return tempInputs;
}
