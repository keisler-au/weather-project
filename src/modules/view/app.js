import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { filterData } from '../model/filtering-data';
import LocationFilter from '../controller/location-controls';
import TableFilters from '../controller/table-filter-controls';
import Temperatures from '../controller/temperature-controls';
import { Tables } from './table-components';
import { wholeWeek, 
    emptyCategories, 
    emptyDataTemplate, 
    filterCategoriesTemplate } from './template-variables';


export class ErrorBoundary extends React.Component {
  state = {'hasError': false};
  componentDidCatch(error) {
      this.setState({'hasError': true});
      console.error('An error occured:', error);
  }
  render() {
      return (this.state.hasError && <h1>An error has occured</h1>) 
    || this.props.children;
  }
}
ErrorBoundary.propTypes = { children: PropTypes.element.isRequired };

export const Context = React.createContext();

function FilterFieldsets() {
    const categories = Object.keys(emptyCategories),
        fieldsetsContent = [
            [
                'Temperature Units', 
                <Temperatures key='1'/>
            ],
            [
                '"Current Weather" Categories',
                <TableFilters key='2' table="current" filters={['Date', 'Time', ...categories]} />
            ],
            [
                '"8 Day Forecast" Categories', 
                <TableFilters key='3' table="forecasted" filters={categories} />
            ],
            [
                '"8 Day Forecast" Days', 
                <TableFilters key='4' table="forecasted" filters={[...wholeWeek, 'deselectAll']}/>
            ]
        ],
        filterInputs = fieldsetsContent.map(([header, element]) => (
            <fieldset key={header}>
                <legend>{header}</legend>
                {element}
            </fieldset>
        ));
    return filterInputs;
}

export function App() {
    function optionalFilterButton({ target: { parentElement, checked }}) {
        parentElement.childNodes[0].nodeValue = checked 
            ? 'Filter \u25B8' 
            : 'Filter \u25B9';
        parentElement.nextElementSibling.className = checked ? 'hide-filters' : 'filter-container';
    }

    const [data, setData] = useState(emptyDataTemplate),
        [forecastedDays, setForecastedDays] = useState(wholeWeek),
        [filteredCategories, setFilteredCategories] = useState(filterCategoriesTemplate),
        filteredDataTemplate =  filterData(filterCategoriesTemplate, data, forecastedDays),
        [filteredData, setFilteredData] = useState(filteredDataTemplate);

    return (
        <ErrorBoundary>
            <Context.Provider value={{
                data, 
                setData, 
                filteredCategories, 
                setFilteredCategories, 
                forecastedDays, 
                setForecastedDays,
                filteredData,
                setFilteredData 
            }}>
                <form>
                    <LocationFilter location="City" />
                    <label className="filter-label">
                        {'Filter \u25B9'}
                        <input type="checkbox" onChange={optionalFilterButton} />
                    </label>
                    <div className="filter-container">
                        <LocationFilter location="Country" />
                        <FilterFieldsets />
                    </div>
                </form>
                <div className="table-container">
                    <Tables />
                </div>
            </Context.Provider>
        </ErrorBoundary>
    );
}



