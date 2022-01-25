import React, { useState } from "react";

import { filterData } from "../model/filtering-data";
import LocationFilter from "../controller/location-controls";
import TableFilters from "../controller/table-filter-controls";
import Temperatures from "../controller/temperature-controls";
import { Tables } from "./table-components/all-table-components";
import { wholeWeek, 
  emptyCategories, 
  emptyDataTemplate, 
  filterCategoriesTemplate } from "./template-variables";


export class ErrorBoundary extends React.Component {
  state = {'hasError': false};
  componentDidCatch(error) {
    this.setState({'hasError': true})
    console.error('An error occured:', error);
  };
  render() {
    return (this.state.hasError && <h1>An error has occured</h1>) 
    || this.props.children
  }
};

export const Context = React.createContext();

function FilterFieldsets() {
  const categories = Object.keys(emptyCategories),
  fieldsetsContent = [
    [
      'Temperature Units', 
      <Temperatures />
    ],
    [
      '"Current Weather" Categories',
      <TableFilters table="current" filterOptions={["Date", "Time", ...categories]} />
    ],
    [
      '"8 Day Forecast" Categories', 
      <TableFilters table="daily" filterOptions={categories} />
    ],
    [
      'Days Shown', 
      <TableFilters table="daily" filterOptions={[...wholeWeek, "deselectAll"]}/>
    ]
  ],
  filterInputs = fieldsetsContent.map(([header, element]) => (
    <fieldset key={header}>
      <legend>{header}</legend>
      {element}
    </fieldset>
  ));
  return filterInputs
};

export function App() {
  function optionalFilterButton({ target: { parentElement, checked }}) {
    parentElement.childNodes[0].nodeValue = checked 
    ? "Optional filters\u25BF" 
    : "Optional filters\u25BE";
    parentElement.className = checked ? 'label-unchecked' : ''; 
    parentElement.nextElementSibling.className = checked ? 'show-filters' : '';
  };

  const [data, setData] = useState(emptyDataTemplate),
  [daysIncluded, setDaysIncluded] = useState(wholeWeek),
  [filteredCategories, setFilteredCategories] = useState(filterCategoriesTemplate),
  filteredDataTemplate =  filterData(filterCategoriesTemplate, data, daysIncluded),
  [filteredData, setFilteredData] = useState(filteredDataTemplate);

  return (
    <ErrorBoundary>
      <Context.Provider value={{
          data, 
          setData, 
          filteredCategories, 
          setFilteredCategories, 
          daysIncluded, 
          setDaysIncluded,
          filteredData,
          setFilteredData 
      }}>
        <form>
          <LocationFilter location="City" />
          <label>{"Optional filters\u25BE"}
            <input type="checkbox" onChange={optionalFilterButton} />
          </label>
          <div>
            <LocationFilter location="Country" />
            <FilterFieldsets />
          </div>
        </form>
        <div>
          <Tables />
        </div>
      </Context.Provider>
    </ErrorBoundary>
  )
};



