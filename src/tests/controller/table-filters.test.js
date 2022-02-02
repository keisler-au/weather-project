import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';
import userEvent from '@testing-library/user-event';

import * as filterDataObject from '../../modules/model/filtering-data';
import { Context } from '../../modules/view/app';
import TableFilters from '../../modules/controller/table-filter-controls';


const container = document.createElement('div');
document.body.appendChild(container);

const filteredCategories = { 
        'current': {
            'foo': true,
            'bar': true
        },
        'forecasted': {
            'foo': true,
            'bar': true
        }
    },
    data = { 'forecasted': [{'Date': null}, {'Date': null}, {'Date': null}] },
    forecastedDays = [0, 1, 2, 3, 4, 5, 6, 7],
    setForecastedDays = jest.fn(),
    setFilteredCategories = jest.fn(),
    setFilteredData = jest.fn(),
    renderComponent = (filters, table='forecasted', header='Filters') => {
        const componentToRender= 
            <fieldset> 
                <legend>{header}</legend>
                <Context.Provider value={{
                    data, 
                    forecastedDays, 
                    setForecastedDays,
                    filteredCategories,
                    setFilteredCategories,
                    setFilteredData
                }}>
                    <TableFilters table={table} filters={filters} />
                </Context.Provider>
            </fieldset>;
        act(() => { render(componentToRender, container); });
    };
jest.spyOn(filterDataObject, 'filterData').mockImplementation(() => {});

describe('<TableFilters />', () => {
    let filters,
        expectedHTML;
    describe('Returning array of <label>s', () => {
        beforeEach(() => { 
            expectedHTML = '<fieldset><legend>Filters</legend>';
        });
        it('Renders "Day x" for each number element in "filters" array', () => {
            filters = [0, 1, 2];
            renderComponent(filters);
            expectedHTML +=
                '<label>Day 1<input type="checkbox" checked=""></label>' +
                '<label>Day 2<input type="checkbox" checked=""></label>' +
                '<label>Day 3<input type="checkbox" checked=""></label></fieldset>';
            expect(container.innerHTML).toBe(expectedHTML);

        });
        it('Renders each string element in "filters" array', () => {
            filters = ['foo', 'bar'];
            renderComponent(filters);
            expectedHTML +=
                '<label>foo<input type="checkbox" checked=""></label>' +
                '<label>bar<input type="checkbox" checked=""></label></fieldset>';
            expect(container.innerHTML).toBe(expectedHTML);
        });
        it('Renders no elements when length of "filters" is 0', () => {
            filters = [];
            renderComponent(filters);
            expectedHTML += '</fieldset>';
            expect(container.innerHTML).toBe(expectedHTML);
        });
    });
    describe('displayFilters() onChange event handler', () => {
        let deselectAllCheckbox,
            deselectSingleCheckbox,
            expectedFilteredCategories,
            expectedforecastedDays;
        describe('User event for select/deselect ALL columns/rows', () => {
            it('Deselects/selects all "Current Weather" category rows by setting all "filterCategories.current" attributes to false/true', () => {
                filters = ['foo', 'bar', 'deselectAll'];
                renderComponent(filters, 'current', 'Categories');
                deselectAllCheckbox = document.querySelector('label:last-of-type');
                userEvent.click(deselectAllCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': false, 'bar': false }, 
                    'forecasted': { 'foo': true, 'bar': true } 
                };
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
                userEvent.click(deselectAllCheckbox);
                expectedFilteredCategories = { 
                    'current': { 'foo': true, 'bar': true }, 
                    'forecasted': { 'foo': true, 'bar': true } 
                };
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
            });
            it('Deselects/selects all "8 Day Forecast" category rows by setting all "filterCategories.forecasted" attributes to false/true', () => {
                renderComponent(filters, 'forecasted', 'Categories');
                userEvent.click(deselectAllCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': true, 'bar': true }, 
                    'forecasted': { 'foo': false, 'bar': false } 
                };
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
                userEvent.click(deselectAllCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': true, 'bar': true }, 
                    'forecasted': { 'foo': true, 'bar': true } 
                };
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
            });
            it('Deselects/selects all "Days Shown" day columns by setting "forecastedDays" array to length of 0 or 8', () => {
                renderComponent(filters, 'forecasted', 'Days Shown');
                userEvent.click(deselectAllCheckbox); 
                expectedforecastedDays = [];
                expect(setForecastedDays).toHaveBeenLastCalledWith(expectedforecastedDays);
                userEvent.click(deselectAllCheckbox); 
                expectedforecastedDays = [0, 1, 2, 3, 4, 5, 6, 7];
                expect(setForecastedDays).toHaveBeenLastCalledWith(expectedforecastedDays);
            });
        });   
        describe('User event for select/deselect single column/row', () => {
            it('Deselects/selects single "Current Weather" category row by setting "filterCategories.current" attribute to false/true', () => {
                renderComponent(filters, 'current', 'Categories');
                deselectSingleCheckbox = document.querySelector('label:first-of-type');
                userEvent.click(deselectSingleCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': false, 'bar': true }, 
                    'forecasted': { 'foo': true, 'bar': true } 
                }; 
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
                userEvent.click(deselectSingleCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': true, 'bar': true }, 
                    'forecasted': { 'foo': true, 'bar': true } 
                }; 
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
            });
            it('Deselects/selects single "8 Day Forecast" category row by setting "filterCategories.forecasted" attribute to false/true', () => {
                renderComponent(filters, 'forecasted', 'Categories');
                userEvent.click(deselectSingleCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': true, 'bar': true }, 
                    'forecasted': { 'foo': false, 'bar': true } 
                }; 
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
                userEvent.click(deselectSingleCheckbox); 
                expectedFilteredCategories = { 
                    'current': { 'foo': true, 'bar': true }, 
                    'forecasted': { 'foo': true, 'bar': true } 
                }; 
                expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
            });
            it('Deselects/selects single "Days Shown" day column by removing/adding a day integer from "forecastedDays"', () => {
                renderComponent(filters, 'forecasted', 'Days Shown');
                deselectSingleCheckbox = document.querySelector('label:nth-of-type(2)');
                userEvent.click(deselectSingleCheckbox); 
                expectedforecastedDays = [0, 2, 3, 4, 5, 6, 7];
                expect(setForecastedDays).toHaveBeenLastCalledWith(expectedforecastedDays);
                userEvent.click(deselectSingleCheckbox);
                expectedforecastedDays = [0, 1, 2, 3, 4, 5, 6, 7];
                expect(setForecastedDays).toHaveBeenLastCalledWith(expectedforecastedDays);
            });
        });          
        const getHtmlString = className => (
            '<fieldset><legend>Categories</legend>' +
                `<label class="${className}">foo<input type="checkbox" checked=""></label>` +
                `<label class="${className}">bar<input type="checkbox" checked=""></label>` +
                `<label class="${className}">deselectAll<input type="checkbox" checked=""></label>`
            + '</fieldset>'
        );
        describe('User event changes <label> class names', () => {
            it('Deselect/select all category rows updates corresponding <label> class name', () => {
                filters = ['foo', 'bar', 'deselectAll'];
                renderComponent(filters, 'current', 'Categories');
                userEvent.click(deselectAllCheckbox); 
                expectedHTML = getHtmlString('input-unselected');
                expect(container.innerHTML).toBe(expectedHTML);
                userEvent.click(deselectAllCheckbox); 
                expectedHTML = getHtmlString('');
                expect(container.innerHTML).toBe(expectedHTML);
            });
        });
    });
});  