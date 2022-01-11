import React from "react";

import { emptyCategories } from "../view/app";
import { wholeWeek } from "../view/app";
import TableFilters from "./table-filter-controls";
import Temperatures from "./temperature-controls";


export default function TemperatureAndTableFilters() {
  const categories = Object.keys(emptyCategories),
  fieldsetsContent = [
    [
      'Temperature Units', 
      <Temperatures />
    ],
    [
      '"Current Weather" Categories',
      <TableFilters table="current" filterOptions={['Date', 'Time', ...categories]} /> 
    ],
    [
      '"8 Day Forecast" Categories', 
      <TableFilters table="daily" filterOptions={categories} /> 
    ],
    [
      'Days Shown', 
      <TableFilters table="daily" filterOptions={[...wholeWeek, 'deselect']}/>
    ]
  ],
  filterInputs = fieldsetsContent.map(([header, element]) => {
    return (
      <fieldset key={header}>
        <legend>{header}</legend>
        {element}
      </fieldset>
    )
  });

  return filterInputs
};
