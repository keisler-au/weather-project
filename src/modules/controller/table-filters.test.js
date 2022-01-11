import { act } from "react-dom/test-utils";
import React, { useContext } from "react";
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import TableFilters from "./table-filter-controls";


const container = document.createElement("div");
document.body.appendChild(container);

const addContext = (filterOptions, table="daily") => {
    const daysIncluded = [0, 1, 2, 3, 4, 5, 6, 7],
    data = { 

        'daily': Array.from(daysIncluded, () => ({'day': null})) 
    },
    setDaysIncluded = jest.fn(),
    filteredCategories = { 
        'current': {
            'Time': true,
            'Temperature': true
        },
        'daily': {
            'Temperature': true,
            'Clouds': true
        }
    },
    setFilteredCategories = jest.fn(),
    setFilteredData = jest.fn();

    return (
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
    )
};

describe('<TableFilters />', () => {
    let filterOptions,
    componentToRender,
    expected;
    describe('Returns an array of labels', () => {
        it('Renders three labels with updated text content of "Day x"', () => {
            filterOptions = [0, 1, 2];
            componentToRender = addContext(filterOptions);
            act(() => { render(componentToRender, container) });
            expected = '<label>Day 1<input type="checkbox" checked=""></label>' +
            '<label>Day 2<input type="checkbox" checked=""></label>' +
            '<label>Day 3<input type="checkbox" checked=""></label>';
            expect(container.innerHTML).toBe(expected);
        });
        it('Renders two labels with text content of "filterOptions"', () => {
            filterOptions = ['foo', 'bar'];
            componentToRender = addContext(filterOptions);
            act(() => { render(componentToRender, container) });
            expected = '<label>foo<input type="checkbox" checked=""></label>' +
            '<label>bar<input type="checkbox" checked=""></label>';
            expect(container.innerHTML).toBe(expected);
        });
        it('Renders nothing when length of "filtersOptions" equals 0', () => {
            filterOptions = [];
            componentToRender = addContext(filterOptions);
            act(() => { render(componentToRender, container) });
            expected = '';
            expect(container.innerHTML).toBe(expected);
        });
    });

    describe('Clicking on a "Current Weather" category filter', () => {
        it('Sets selected "Current Weather" category in "filterCategories" to "false", removes selected category row from "Current Weather" table', () => {
            filterOptions = ['Time', 'Temperature'];
            componentToRender = addContext(filterOptions, 'current');
            act(() => { render(componentToRender, container) });
            const timeCategory = container.querySelector('input');
            userEvent.click(timeCategory);
            
            expect(container).toBe('')

        });
        it('Sets selected "Current Weather" category in "filterCategories" to "true", adds selected category row to "Current Weather" table', () => {

        });
    });
    describe('Clicking on a "8 Day Forecast" category filter', () => {
        it('Sets selected "8 Day Forecast" category in "filterCategories" to "false", removes selected category row from "8 Day Forecast" table', () => {

        });
        it('Sets selected "8 Day Forecast" category in "filterCategories" to "true", adds selected category row to "8 Day Forecast" table', () => {

        });
    });
    describe('Clicking on a "Shown Days" filter', () => {
        it('Removes index of selected day from "daysIncluded", calls "setFilteredCategories()", and removes that days column from "8 Day Forecast" table', () => {

        });
        it('Adds index of selected day from "daysIncluded", calls "setFilteredCategories()", and adds that days column to "8 Day Forecast" table', () => {

        });
    });
    describe('Clicking "Current Weather" deselect filter', () => {
        it('Sets all "Current Weather" fieldset <label> to "className=input-unselected", all <input> to "checked=false"', () => {

        });
        it('Sets all "Current Weather" categories in "filterCategories" to "false", removes all category rows from  "Current Weather" table', () => {

        });
        it('Sets all "Current Weather" fieldset <label> to "className=", all <input> to "checked=true"', () => {

        });
        it('Sets all "Current Weather" categories in "filterCategories" to "true", adds all category rows to "Current Weather" table', () => {

        });
    });
    describe('Clicking "8 Day Forecast" deselect filter', () => {
        it('Sets all "8 Day Forecast" fieldset <label> to "className=input-unselected", all <input> to "checked=false"', () => {

        });
        it('Sets all "8 Day Forecast" categories in "filterCategories" to "false", removes all category rows from  "8 Day Forecast" table', () => {

        });
        it('Sets all "8 Day Forecast" fieldset <label> to "className=", all <input> to "checked=true"', () => {

        });
        it('Sets all "8 Day Forecast" categories in "filterCategories" to "true", adds all category rows to "8 Day Forecast" table', () => {

        });
    });
    describe('Clicking "Shown Days" deselect filter', () => {
        it('Sets all "Shown Days" fieldset <label> to "className=input-unselected", all <input> to "checked=false"', () => {

        });
        it('Sets "daysIncluded" to "[]", removes all day columns from  "Shown Days" table', () => {

        });
        it('Sets all "Shown Days" fieldset <label> to "className=", all <input> to "checked=true"', () => {

        });
        it('Sets "daysIncluded" to "wholeWeek", adds all day columns too "Shown Days" table', () => {

        });
    });
});  