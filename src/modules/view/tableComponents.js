import React, { useContext } from 'react';

import { Context } from './app';
  

function DayHeaders() {
  const { data, daysIncluded } = useContext(Context);

  return (
    <thead>
      <tr>
        <th>&nbsp;</th>
        {daysIncluded.map(day => 
        <th key={day.toString()}>{data.daily[day].day || 'Day '+(day+1)}</th>)}
      </tr>
    </thead>
  )
};
  

function CreateRows({ tableContent }) {
  const rows = Object.entries(tableContent).map(([header, data]) => {
    return (
      <tr key={header}>
        <th scope="row">{header}</th>
        {(Array.isArray(data) 
        && Array.from(data, (daysData, i) => <td key={i.toString()}>{daysData[header]}</td>)) 
        || <td>{data}</td>}
      </tr>
      )
  });

  return rows
};


function Tables({ filteredData }) {
  const { data, filters } = useContext(Context);
  let dailyData = {};
  for (const header in filters.daily) {
    if (filters.daily[header] === true) { 
      dailyData[header] = filteredData.daily 
    } 
  };
  const tableInformation = [
    ['Location', data.location], 
    ['Current Weather', filteredData.current], 
    ['8 Day Forecast', dailyData]
  ],
  tables = tableInformation.map(([title, tableContent]) => {
      return (
        <table key={title}>
          <caption>{title}</caption>
          {title==='8 Day Forecast' && <DayHeaders />}
          <tbody><CreateRows tableContent={tableContent} /></tbody>
        </table>
      )
  });

  return tables
};

export { 
  Tables, 
  DayHeaders, 
  CreateRows 
};