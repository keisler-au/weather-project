import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { Context } from './app';


export function DayHeaders() {
    const { data, forecastedDays } = useContext(Context);
    return (
        <thead>
            <tr>
                <th> </th>
                {forecastedDays.map(day => {
                    let header = data.forecasted[day].Date || 'Day '+ (day+1);
                    header = header.split(' ');
                    return (
                        <th key={day.toString()}>
                            {header[0]}<br/>{header[1]}
                        </th>  
                    );
                })}
            </tr>
        </thead>
    );
}
  
export function CreateRows({ tableContent }) {
    const rows = Object.entries(tableContent).map(([header, data]) => (
        <tr 
            key={header} 
            className={['Date', 'Time'].includes(header) ? 'time-row' : ''}
        >
            <th scope="row">{header}</th>
            {(Array.isArray(data) && Array.from(data, (day, i) => <td key={i.toString()}>{day}</td>)) || <td>{data}</td>}
        </tr>
    ));
  
    return <tbody>{rows}</tbody>;
}
CreateRows.propTypes = { tableContent: PropTypes.object.isRequired };

export function Tables() {
    const { data, filteredData } = useContext(Context),
        tableInformation = [
            ['Location', data.location], 
            ['Current Weather', filteredData.current], 
            ['8 Day Forecast', filteredData.forecasted]
        ],
        tables = tableInformation.map(([title, tableContent]) => (
            <table key={title}>
                <caption>{title}</caption>
                {title.includes('8') && <DayHeaders />}
                <CreateRows tableContent={tableContent} />
                {title.includes('8') && <tfoot><tr><td>* Data provided by OpenWeather API</td></tr></tfoot>}
            </table>
        ));

    return tables;
}
