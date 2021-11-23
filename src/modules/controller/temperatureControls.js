import React, { useContext } from 'react';

import { Context } from '../../view/app';
import { filterData } from '../../model/filteringData';


export function Temperatures() {
    const {
        data, 
        daysIncluded, 
        filterStatus, 
        setFilterStatus, 
        setFilteredData
    } = useContext(Context);

    function changeUnit() {
        const unit = filterStatus.current.tempUnit === 'Fahrenheit' ? 'Celsius' : 'Fahrenheit';
        setFilterStatus(pre => { 
            const filter = {
                'current': {
                    ...pre.current, 
                    'tempUnit': unit
                }, 
                'daily': {
                    ...pre.daily, 
                    'tempUnit': unit
                } 
            } 
            return filter
        });
        setFilteredData({
            'current': filterData({
                ...filterStatus.current, 
                'tempUnit': unit
            }, 
            data.current
            ),
            'daily': filterData({
                ...filterStatus.daily, 
                'tempUnit': unit
            }, 
            data.daily, 
            daysIncluded
            )
        });
    };

    const tempInputs = ['Celsius', 'Fahrenheit'].map(unit => {
        return <Inputs key={unit}
        type="radio"
        label={unit}
        name="unit"
        checked={unit === filterStatus.current.tempUnit}
        handler={changeUnit}
        />
    });

    return tempInputs
};