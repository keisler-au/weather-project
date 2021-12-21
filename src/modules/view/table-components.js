import React, { useContext } from "react";

import { Context } from "./app";
import { Inputs } from "../controller/input-template";
  

function DayHeaders() {
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
  
function CreateRows({ tableContent }) {
  const rows = Object.entries(tableContent).map(([header, data]) => {
    const className = header === 'Time' || header === 'Date'? 'time-row' : '';
    return (
        <tr key={header} className={className}>
          <th scope="row">{header}</th>
          {
          (
            Array.isArray(data) && Array.from(data, (daysData, i) => (
              <td key={i.toString()}>{daysData}</td> 
            ))
          )
          || <td>{data}</td>
          }
        </tr>
    )
  });

  return <tbody>{rows}</tbody>
};

const LastTableFooter = () => <tfoot><tr><td>** Data provided by OpenWeather API's</td></tr></tfoot>

function Tables() {
  const { data, filteredData } = useContext(Context),
  tableInformation = [
    ['Location', data.location], 
    ['Current Weather', filteredData.current], 
    ['8 Day Forecast', filteredData.daily]
  ];

  function tableFilterButtons({ target: { parentElement, checked }}) {
    let buttonText = parentElement.childNodes[0].nodeValue;
    parentElement.childNodes[0].nodeValue = buttonText.split(buttonText.slice(-1))[0] 
    + (checked ? "\u25BE" : "\u25BF");
    parentElement.nextElementSibling.className = checked ? 'hide-table' : ''; 
  };

  const tables = tableInformation.map(([title, tableContent]) => (
    <React.Fragment key={title}>
      <Inputs label={`${title}\u25BF`} handler={tableFilterButtons} />
      <table>
        <caption>{title}</caption>
        {title==='8 Day Forecast' && <exports.DayHeaders />}
        <exports.CreateRows tableContent={tableContent} />
        {title==='8 Day Forecast' && <exports.LastTableFooter />}
      </table>
    </React.Fragment>
  ));

  return tables
};


const exports = { 
  Tables, 
  DayHeaders, 
  CreateRows,
  LastTableFooter
};
export default exports
export {
  Tables,
  DayHeaders,
  CreateRows,
  LastTableFooter
}