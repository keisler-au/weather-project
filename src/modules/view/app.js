import React, { useState } from "react";

import { filterData } from "../model/filtering-data";
import LocationInput from "../controller/location-controls";
import TemperatureAndTableFilters from "../controller/optional-controls";
import { Tables } from "./table-components";


const Context = React.createContext(),
wholeWeek = [0, 1, 2, 3, 4, 5, 6 ,7],
filterCategories = {
  'Temperature': true,  
  'Clouds': true, 
  'Humidity': true, 
  'Wind': true, 
  'Rain': true, 
  'Description': true, 
  'Sunrise': true, 
  'Sunset': true,
},
filterCategoriesTemplate = {
  'current': {
    'Date': true, 
    'Time': true, 
    ...filterCategories
  },
  'daily': filterCategories
},
emptyCategories =  {
  'Temperature': '',  
  'Clouds': '', 
  'Humidity': '', 
  'Wind': '', 
  'Rain': '', 
  'Description': '', 
  'Sunrise': '', 
  'Sunset': '',
  'deselect': ''
},
emptyDataTemplate = { 
  location: { 
    'Timezone': '' 
  }, 
  current: { 
    'Date': '', 
    'Time': '', 
    ...emptyCategories 
  }, 
  daily: wholeWeek.map(() => emptyCategories)
};

class ErrorBoundary extends React.Component {
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

function App() {
  const [data, setData] = useState(emptyDataTemplate),
  [daysIncluded, setDaysIncluded] = useState(wholeWeek),
  [filteredCategories, setFilteredCategories] = useState(filterCategoriesTemplate),
  [filteredData, setFilteredData] = useState(
    filterData(filterCategoriesTemplate, data, daysIncluded)
  );

  function optionalFilterButton({ target: { parentElement, checked }}) {
    parentElement.childNodes[0].nodeValue = checked 
    ? "Optional filters\u25BF" 
    : "Optional filters\u25BE";
    parentElement.className = checked ? 'label-unchecked' : ''; 
    parentElement.nextElementSibling.className = checked ? 'show-filters' : '';
  };

  return (
    <ErrorBoundary>
      <Context.Provider value={
        {
          data, 
          setData, 
          filteredCategories, 
          setFilteredCategories, 
          daysIncluded, 
          setDaysIncluded,
          filteredData,
          setFilteredData 
        }
      }>
        <form>
          <LocationInput location="City" />
          <label>{"Optional filters\u25BE"}
            <input type="checkbox" onChange={optionalFilterButton} />
          </label>
          <div>
            <LocationInput location="Country" />
            <TemperatureAndTableFilters />
          </div>
        </form>
        <div>
          <Tables />
        </div>
      </Context.Provider>
    </ErrorBoundary>
  )
};

export {
  ErrorBoundary, 
  Context, 
  wholeWeek, 
  emptyCategories, 
  emptyDataTemplate, 
  App
};


