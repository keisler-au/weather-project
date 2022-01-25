import { act } from "react-dom/test-utils";
import React from "react"
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../app";
import { Tables } from "./all-table-components";


let container = document.createElement("div");
document.body.appendChild(container);

describe('<Tables />', () => {
    let expectedHtml;

    it('Renders three tables with specified titles and mocked data', () => {
        const data = { 
            'location': { 'Location Header': 'Location Data'} ,
            'daily': [{ 'Date': null }, { 'Date': null }]
        },
        filteredData = { 
            'current': { 
                'Current Header1': 'Current Data1',
                'Current Header2': 'Current Data2'
            },
            'daily': {
                'Daily Header1': ['Daily Data1', 'Daily Data2'],
                'Daily Header2': ['Daily Data3', 'Daily Data4']
            }
        },
        daysIncluded = [0, 1];
        act(() => {
            render(        
                <Context.Provider value={{ data, filteredData, daysIncluded }}>
                    <Tables />
                </Context.Provider>, 
                container
            )
        });
        expectedHtml = 
            '<label>Location\u25BF<input type="checkbox"></label>' +
            '<table>' +
                '<caption>Location</caption>' +
                '<tbody><tr class="">' +
                    '<th scope="row">Location Header</th>' +
                    '<td>Location Data</td></tr>' +
                '</tbody>' +
            '</table>' +

            '<label>Current Weather▿<input type="checkbox"></label>' +
            '<table>' +
                '<caption>Current Weather</caption>' +
                '<tbody>' +
                    '<tr class="">' +
                        '<th scope="row">Current Header1</th>' +
                        '<td>Current Data1</td>' +
                    '</tr>' +
                    '<tr class="">' +
                        '<th scope="row">Current Header2</th>' +
                        '<td>Current Data2</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +

            '<label>8 Day Forecast▿<input type="checkbox"></label>' +
            '<table>' +
                '<caption>8 Day Forecast</caption>' +
                '<thead><tr><th> </th><th>Day<br>1</th><th>Day<br>2</th></tr></thead>' +
                '<tbody>' +
                    '<tr class="">' +
                        '<th scope="row">Daily Header1</th>' +
                        '<td>Daily Data1</td>' +
                        '<td>Daily Data2</td>' +
                    '</tr>' +
                    '<tr class="">' +
                        '<th scope="row">Daily Header2</th>' +
                        '<td>Daily Data3</td>' +
                        '<td>Daily Data4</td>' +
                    '</tr>' +
                '</tbody>' +
                '<tfoot><tr><td>* Data provided by OpenWeather API</td></tr></tfoot>' +
            '</table>';

        expect(container.innerHTML).toBe(expectedHtml)
    });

    it('onChange event changes <label>.textContent and <table class="">', () => {
        const tableDisplayCheckbox = document.querySelector('input');
        userEvent.click(tableDisplayCheckbox); 
        expectedHtml = '<label>Location\u25BE<input type="checkbox"></label>'
            + '<table class="hide-table">';
        expect(container.innerHTML).toContain(expectedHtml);

        userEvent.click(tableDisplayCheckbox); 
        expectedHtml = '<label>Location\u25BF<input type="checkbox"></label>'
            + '<table class="">';
        expect(container.innerHTML).toContain(expectedHtml);
    });
});
