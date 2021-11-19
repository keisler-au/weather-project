import React, { useState } from 'react'

import {Fieldsets, LocationInputs, OptionalInputs} from './form-controls'
import {Tables} from './table-elements'
import {filterData} from './manipulate-data'


class ErrorBoundary extends React.Component {
  state = {'error': false};
  componentDidCatch(error) {
    this.setState({'error': true})
    console.log('An error occured:', error);
  };
  render() {
    return (this.state.error && 
    <>
      <h1>An error has occured</h1>
      <p>Try refreshing the page</p>
    </>) 
    || this.props.children
  }
};

const Context = React.createContext(),
categoryTemplate =  {'Temperature': '', 'Clouds': '', 'Rain': '', 'Wind': '', 'Humidity': '','Description': '', 'Sunrise': '', 'Sunset': ''},
wholeWeek = [0, 1, 2, 3, 4, 5, 6 ,7],
filtersTemplate = {'tempUnit': 'Celsius', 'Temperature': true, 'Clouds': true, 'Rain': true, 'Wind': true, 'Humidity': true, 'Description': true, 'Sunrise': true, 'Sunset': true},
emptyDataTemplate = { location: {'Timezone': '', Longditude: '', Latitude: ''}, 
  current: {'Date': '', 'Time': '', ...categoryTemplate}, 
  daily: wholeWeek.map(() => { return {'day': '', ...categoryTemplate} })
};

function App() {
  const [data, setData] = useState(emptyDataTemplate),
  [daysIncluded, setDaysIncluded] = useState(wholeWeek),
  [filters, setFilters] = useState({'current': {'Date': true, 'Time': true, ...filtersTemplate},
  'daily': filtersTemplate} ),
  [filteredData, setFilteredData] = useState({'current': filterData(filters.current, data.current), 'daily': filterData(filters.daily, data.daily, daysIncluded)} );
  return (
    <ErrorBoundary>
      <Context.Provider value={{data, setData, filters, setFilters, daysIncluded, setDaysIncluded,setFilteredData }}>
        <form>
          <Fieldsets header="Location" element={<LocationInputs />} />
          <Fieldsets header="Optional filters^" element={<OptionalInputs />} />
        </form>
        <Tables filteredData={filteredData} />
      </Context.Provider>
    </ErrorBoundary>
  )
};

export {ErrorBoundary, Context, wholeWeek, categoryTemplate, emptyDataTemplate, App}

// *Data provided by OpenWeather API's*
  // geoData = API that provides longditude and latitude coordinates
  // weatherData = API that provides weather information based on geographical coordinates
// *API calls no more than once in 10 minutes for each location, update frequency no higher than once in 10 minutes*
