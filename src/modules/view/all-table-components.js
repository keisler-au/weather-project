import React, { useContext } from "react";

import { Context } from "../app";


export function DayHeaders() {
  const { data, daysIncluded } = useContext(Context);
  return (
    <thead>
      <tr>
        <th> </th>
        {daysIncluded.map(day => {
          let header = data.daily[day].Date || 'Day '+ (day+1);
          header = header.split(' ');
          return (
            <th key={day.toString()}>
              {header[0]}<br/>{header[1]}
            </th>  
          )
        })}
      </tr>
    </thead>
  )
};
  
export function CreateRows({ tableContent }) {
  const rows = Object.entries(tableContent).map(([header, data]) => (
    <tr 
      key={header} 
      className={['Date', 'Time'].includes(header) ? 'time-row' : ''}
    >
      <th scope="row">{header}</th>
      {(Array.isArray(data) && Array.from(data, (day, i) => <td key={i.toString()}>{day}</td>)) ||
      <td>{data}</td>}
    </tr>
  ));
  
  return <tbody>{rows}</tbody>
};

export function Tables() {
  function tableFilterButtons({ target: { parentElement, checked }}) {
    const textInButton = parentElement.childNodes[0].nodeValue,
    symbolInButton = textInButton.slice(-1),
    wordInButton = textInButton.split(symbolInButton)[0],
    newSymbol = checked ? '\u25BE' : '\u25BF';
    parentElement.childNodes[0].nodeValue = wordInButton + newSymbol;
    parentElement.nextElementSibling.className = checked ? 'hide-table' : ''; 
  };

  const { data, filteredData } = useContext(Context),
  tableInformation = [
    ['Location', data.location], 
    ['Current Weather', filteredData.current], 
    ['8 Day Forecast', filteredData.daily]
  ],
  tables = tableInformation.map(([title, tableContent]) => (
    <React.Fragment key={title}>
      <label>{`${title}\u25BF`}
        <input type="checkbox" onChange={tableFilterButtons}/>
      </label>
      <table>
        <caption>{title}</caption>
        {title.includes('8') && <DayHeaders />}
        <CreateRows tableContent={tableContent} />
        {title.includes('8') && <tfoot><tr><td>* Data provided by OpenWeather API</td></tr></tfoot>}
      </table>
    </React.Fragment>
  ));

  return tables
};
