import React, { useContext } from "react";

import { Context } from "../view/app";
import { filterData } from "../model/filtering-data";
import { Inputs } from "./input-template";

import { emptyDataTemplate } from "../view/app";
// function convertTempData(data) {
//     const celsius = data.Temperature,
//     fahrenheit = Math.round(celsius * (9/5) + 32),
//     convertedData = {
//         ...data, 
//         'Temperature': fahrenheit
//     };

//     return convertedData
// }; 

function convertTempData(data, fChecked) {

    const oldTemp = data.Temperature,
    newTemp = fChecked 
    ? Math.round(oldTemp * (9/5) + 32)
    : Math.round((oldTemp - 32) * (5/9)),
    convertedData = {
        ...data, 
        'Temperature': newTemp
    };

    return convertedData
}; 
function Temperatures() {
    const {
        data, 
        daysIncluded, 
        filteredCategories, 
        setFilteredData
    } = useContext(Context);

    function changeTempUnit({ target: { checked, parentElement }}) {  
        const fahrenheit = checked && parentElement.textContent === 'Fahrenheit',
        availableData = JSON.stringify(data) !== JSON.stringify(emptyDataTemplate);
        if (availableData) {
            data.current = convertTempData(data.current, fahrenheit);
            data.daily = data.daily.map(dayData => convertTempData(dayData, fahrenheit));
        }

        setFilteredData(filterData(filteredCategories, data, daysIncluded));
    };
    
    const tempInputs = ['Celsius', 'Fahrenheit'].map(unit => {
        const units = document.querySelectorAll('[name=temp]'),
        defaultCheck = unit === 'Celsius',
        classNames = !units.length && defaultCheck 
        ? 'input-selected' 
        : units.length && defaultCheck && units[0].checked
        ? 'input-selected'
        : units.length && !defaultCheck && units[1].checked
        ? 'input-selected'
        : '',
        tempInput = 
        <label 
            key={unit} 
            className={classNames}
        >
            {unit}
            <input 
                type="radio" 
                name="temp"
                onChange={changeTempUnit} 
                defaultChecked={defaultCheck}
            />
        </label>;

        return tempInput
    });

    return tempInputs
};

const exports = { convertTempData, Temperatures, Inputs };
export default exports;
export { convertTempData, Temperatures };