import React, { useContext } from "react";

import { Context } from "../view/app";
import { convertTempData } from "../model/parsing-data";
import { filterData } from "../model/filtering-data";
import { emptyDataTemplate } from "../view/app";


export default function Temperatures() {
    const {
        data, 
        daysIncluded, 
        filteredCategories, 
        setFilteredData
    } = useContext(Context);

    function changeTempUnit() {  
        const availableData = JSON.stringify(data) !== JSON.stringify(emptyDataTemplate);
        if (availableData) {
            data.current = convertTempData(data.current);
            data.daily = data.daily.map(dayData => convertTempData(dayData));
        }

        setFilteredData(filterData(filteredCategories, data, daysIncluded));
    };

    const previouslyRendered = document.querySelectorAll('[name=temp]'),
    
    tempInputs = ['Celsius', 'Fahrenheit'].map(unit => {
        const unitIsCelsius = unit === 'Celsius',
        className = (!previouslyRendered.length && unitIsCelsius)
            || (previouslyRendered.length && unitIsCelsius && previouslyRendered[0].checked)
            || (previouslyRendered.length && !unitIsCelsius && previouslyRendered[1].checked)
            ? 'input-selected' : '',

        tempInput = 
            <label key={unit} className={className}>
                {unit}
                <input 
                    type="radio" 
                    name="temp"
                    onChange={changeTempUnit} 
                    defaultChecked={unitIsCelsius}
                />
            </label>;

        return tempInput
    });

    return tempInputs
};
