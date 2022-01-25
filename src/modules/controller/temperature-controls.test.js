import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import * as filterDataObject from "../model/filtering-data";
import Temperatures from "./temperature-controls";


let container = document.createElement("div");
document.body.appendChild(container);

jest.mock('../model/parsing-data', () => ({ convertTempData: jest.fn(() => true) }));
const data = { 'current': false, 'daily': [false] },
daysIncluded = null,
filteredCategories = null,
setFilteredData = jest.fn();

describe('<Temperatures />', () => {
    let expectedHTML;
    const componentToRender = 
        <Context.Provider value={{
            data, 
            daysIncluded, 
            filteredCategories,
            setFilteredData
        }}>
            <Temperatures />
        </Context.Provider>;

    act(() => { 
        render(componentToRender, container) 
    });
    it('"celsius" label has no className on first load', () => {
        expectedHTML = '<label>Celsius';
        expect(container.innerHTML).toContain(expectedHTML);
        expectedHTML = '<label>Fahrenheit';
        expect(container.innerHTML).toContain(expectedHTML);
    });
    describe('"changeTempUnits" onChange event handler', () => {
        it('"data" variable used in "filterData() updated after onChange event"', () => {
            const filterData = jest.spyOn(filterDataObject, 'filterData'),
            fahrenheitRadioButton = document.getElementById('fahrenheit');
            userEvent.click(fahrenheitRadioButton); 
            const expectedData = { 'current': true, 'daily': [true] };
            expect(filterData).toHaveBeenCalledWith(filteredCategories, expectedData, daysIncluded);
        });
        it('"Fahrenheit" label with "input-selected" className after onChange event', () => {
            expectedHTML = '<label class="input-unselected">Celsius';
            expect(container.innerHTML).toContain(expectedHTML);
            expectedHTML = '<label class="input-selected">Fahrenheit';
            expect(container.innerHTML).toContain(expectedHTML);
        });
        it('"Celsius" label with "input-selected" className after onChange event', () => {
            const celsiusRadioButton = document.getElementById('celsius');
            userEvent.click(celsiusRadioButton); 
            expectedHTML = '<label class="input-selected">Celsius';
            expect(container.innerHTML).toContain(expectedHTML);
            expectedHTML = '<label class="input-unselected">Fahrenheit';
            expect(container.innerHTML).toContain(expectedHTML);
        });
    })
});
