import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import * as filterDataObject from "../model/filtering-data";
import { Context } from "../view/app";
import TableFilters from "./table-filter-controls";


const container = document.createElement("div");
document.body.appendChild(container);

const filteredCategories = { 
    'current': {
        'foo': true,
        'bar': true
    },
    'daily': {
        'foo': true,
        'bar': true
    }
},
data = { 'daily': [{'Date': null}, {'Date': null}, {'Date': null}] },
daysIncluded = [0, 1, 2, 3, 4, 5, 6, 7],
setDaysIncluded = jest.fn(),
setFilteredCategories = jest.fn(),
setFilteredData = jest.fn(),
addContext = (filterOptions, table="daily", header='Filters') => (
    <fieldset> 
        <legend>{header}</legend>
        <Context.Provider value={{
            data, 
            daysIncluded, 
            setDaysIncluded,
            filteredCategories,
            setFilteredCategories,
            setFilteredData
        }}>
            <TableFilters table={table} filterOptions={filterOptions} />
        </Context.Provider>
    </fieldset>
);
jest.spyOn(filterDataObject, 'filterData').mockImplementation(() => {});

describe('<TableFilters />', () => {
    let filterOptions,
    componentToRender,
    expectedHTML;
    describe('Returning array of <label>', () => {
        beforeEach(() => { 
            expectedHTML = '<fieldset><legend>Filters</legend>' 
        });
        it('Renders "Day x" for each number element in "filterOptions" array', () => {
            filterOptions = [0, 1, 2];
            componentToRender = addContext(filterOptions);
            act(() => { 
                render(componentToRender, container) 
            });
            expectedHTML +=
                '<label>Day 1<input type="checkbox" checked=""></label>' +
                '<label>Day 2<input type="checkbox" checked=""></label>' +
                '<label>Day 3<input type="checkbox" checked=""></label></fieldset>';
            expect(container.innerHTML).toBe(expectedHTML);
        });
        it('Renders each string element in "filterOptions" array', () => {
            filterOptions = ['foo', 'bar'];
            componentToRender = addContext(filterOptions);
            act(() => { 
                render(componentToRender, container) 
            });
            expectedHTML +=
                '<label>foo<input type="checkbox" checked=""></label>' +
                '<label>bar<input type="checkbox" checked=""></label></fieldset>';
            expect(container.innerHTML).toBe(expectedHTML);
        });
        it('Renders no elements when length of "filtersOptions" is 0', () => {
            filterOptions = [];
            componentToRender = addContext(filterOptions);
            act(() => { 
                render(componentToRender, container) 
            });
            expectedHTML += '</fieldset>';
            expect(container.innerHTML).toBe(expectedHTML);
        });
    });

    describe('displayFilters() onChange event handler updates respective variables', () => {
        const getHtmlString = className => (
            '<fieldset><legend>Categories</legend>' +
            `<label class="${className}">foo<input type="checkbox" checked=""></label>` +
            `<label class="${className}">bar<input type="checkbox" checked=""></label>` +
            `<label class="${className}">deselectAll<input type="checkbox" checked=""></label>`
            + '</fieldset>'
        );
        let deselectAllCheckbox,
        deselectSingleCheckbox,
        expectedFilteredCategories,
        expectedDaysIncluded;

        it('Deselects all categories updating <label class="">', () => {
            filterOptions = ['foo', 'bar', 'deselectAll'];
            componentToRender = addContext(filterOptions, 'current', 'Categories');
            act(() => { 
                render(componentToRender, container) 
            });
            deselectAllCheckbox = document.querySelector('label:last-of-type');
            userEvent.click(deselectAllCheckbox); 
            expectedHTML = getHtmlString('input-unselected');
            expect(container.innerHTML).toBe(expectedHTML);
        });
        it('Selects all categories updating <label class="">', () => {
            userEvent.click(deselectAllCheckbox); 
            expectedHTML = getHtmlString('');
            expect(container.innerHTML).toBe(expectedHTML);
        });
        it('Deselects all "Current Weather" categories updating "filterCategories.current"', () => {
            filterOptions = ['foo', 'bar', 'deselectAll'];
            componentToRender = addContext(filterOptions, 'current', 'Categories');
            act(() => { 
                render(componentToRender, container) 
            });
            deselectAllCheckbox = document.querySelector('label:last-of-type');
            userEvent.click(deselectAllCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': false, 'bar': false }, 
                'daily': { 'foo': true, 'bar': true } 
            };
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Selects all "Current Weather" categories updating "filterCategories.current"', () => {
            userEvent.click(deselectAllCheckbox);
            expectedFilteredCategories = { 
                'current': { 'foo': true, 'bar': true }, 
                'daily': { 'foo': true, 'bar': true } 
            };
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Deselects all "Daily Forecast" categories updating "filterCategories.daily"', () => {
            componentToRender = addContext(filterOptions, 'daily', 'Categories');
            act(() => { 
                render(componentToRender, container) 
            });
            userEvent.click(deselectAllCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': true, 'bar': true }, 
                'daily': { 'foo': false, 'bar': false } 
            };
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Selects all "Daily Forecast" categories updating "filterCategories.daily"', () => {
            userEvent.click(deselectAllCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': true, 'bar': true }, 
                'daily': { 'foo': true, 'bar': true } 
            };
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Deselects all "Days Shown" days updating "daysIncluded"', () => {
            componentToRender = addContext(filterOptions, 'daily', 'Days Shown');
            act(() => { 
                render(componentToRender, container) 
            });
            userEvent.click(deselectAllCheckbox); 
            expectedDaysIncluded = [];
            expect(setDaysIncluded).toHaveBeenLastCalledWith(expectedDaysIncluded);
        });
        it('Selects all "Days Shown" days updating "daysIncluded"', () => {
            userEvent.click(deselectAllCheckbox); 
            expectedDaysIncluded = [0, 1, 2, 3, 4, 5, 6, 7];
            expect(setDaysIncluded).toHaveBeenLastCalledWith(expectedDaysIncluded);
        });
        it('Deselects single "Current Weather" category updating "filterCategories.current', () => {
            componentToRender = addContext(filterOptions, 'current', 'Categories');
            act(() => { 
                render(componentToRender, container) 
            });
            deselectSingleCheckbox = document.querySelector('label:first-of-type');
            userEvent.click(deselectSingleCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': false, 'bar': true }, 
                'daily': { 'foo': true, 'bar': true } 
            }; 
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);

        });
        it('Selects single "Current Weather" category updates "filterCategories.current"', () => {
            userEvent.click(deselectSingleCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': true, 'bar': true }, 
                'daily': { 'foo': true, 'bar': true } 
            }; 
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Deselect single "Daily Forecast" category updates "filterCategories.daily"', () => {
            componentToRender = addContext(filterOptions, 'daily', 'Categories');
            act(() => { 
                render(componentToRender, container) 
            });
            userEvent.click(deselectSingleCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': true, 'bar': true }, 
                'daily': { 'foo': false, 'bar': true } 
            }; 
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Select single "Daily Forecast" category updates "filterCategories.current"', () => {
            userEvent.click(deselectSingleCheckbox); 
            expectedFilteredCategories = { 
                'current': { 'foo': true, 'bar': true }, 
                'daily': { 'foo': true, 'bar': true } 
            }; 
            expect(setFilteredCategories).toHaveBeenLastCalledWith(expectedFilteredCategories);
        });
        it('Deselect single "Days Shown" table days updates "daysIncluded"', () => {
            componentToRender = addContext(filterOptions, 'daily', 'Days Shown');
            act(() => { 
                render(componentToRender, container) 
            });
            deselectSingleCheckbox = document.querySelector('label:nth-of-type(2)')
            userEvent.click(deselectSingleCheckbox); 
            expectedDaysIncluded = [0, 2, 3, 4, 5, 6, 7];
            expect(setDaysIncluded).toHaveBeenLastCalledWith(expectedDaysIncluded);
        });
        it('Select single "Days Shown" category updates "filterCategories.current"', () => {
            userEvent.click(deselectSingleCheckbox);
            expectedDaysIncluded = [0, 1, 2, 3, 4, 5, 6, 7];
            expect(setDaysIncluded).toHaveBeenLastCalledWith(expectedDaysIncluded);
        });
    });
});  