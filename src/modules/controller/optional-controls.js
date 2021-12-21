import React from "react";

import { emptyCategories } from "../view/app";
import { Categories } from "./category-controls";
import { Days } from "./day-controls";
import { Temperatures } from "./temperature-controls";



export default function TemperatureAndTableFilters() {
  const categories = Object.keys(emptyCategories),
  fieldsetsContent = [
    [
      'Temperature Units', 
      <Temperatures />
    ],
    [
      '"Current Weather" Categories',
      <Categories table="current" categories={['Date', 'Time', ...categories]} /> 
    ],
    [
      '"8 Day Forecast" Categories', 
      <Categories table="daily" categories={categories} /> 
    ],
    [
      'Days Shown', 
      <Days />
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
