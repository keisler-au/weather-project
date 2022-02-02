import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';

import { Context } from '../../modules/view/app';
import { Tables } from '../../modules/view/table-components';


let container = document.createElement('div');
document.body.appendChild(container);

describe('<Tables />', () => {
    let expectedHtml;

    it('Renders three tables with specified titles and mocked data', () => {
        const data = { 
                'location': { 'Location Header': 'Location Data'} ,
                'forecasted': [{ 'Date': null }, { 'Date': null }]
            },
            filteredData = { 
                'current': { 
                    'Current Header1': 'Current Data1',
                    'Current Header2': 'Current Data2'
                },
                'forecasted': {
                    'Forecast Header1': ['Forecasted Data1', 'Forecasted Data2'],
                    'Forecast Header2': ['Forecasted Data3', 'Forecasted Data4']
                }
            },
            forecastedDays = [0, 1];
        act(() => {
            render(        
                <Context.Provider value={{ data, filteredData, forecastedDays }}>
                    <Tables />
                </Context.Provider>, 
                container
            );
        });
        expectedHtml = 
            '<table>' +
                '<caption>Location</caption>' +
                '<tbody><tr class="">' +
                    '<th scope="row">Location Header</th>' +
                    '<td>Location Data</td></tr>' +
                '</tbody>' +
            '</table>' +
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
            '<table>' +
                '<caption>8 Day Forecast</caption>' +
                '<thead><tr><th> </th><th>Day<br>1</th><th>Day<br>2</th></tr></thead>' +
                '<tbody>' +
                    '<tr class="">' +
                        '<th scope="row">Forecast Header1</th>' +
                        '<td>Forecasted Data1</td>' +
                        '<td>Forecasted Data2</td>' +
                    '</tr>' +
                    '<tr class="">' +
                        '<th scope="row">Forecast Header2</th>' +
                        '<td>Forecasted Data3</td>' +
                        '<td>Forecasted Data4</td>' +
                    '</tr>' +
                '</tbody>' +
                '<tfoot><tr><td>* Data provided by OpenWeather API</td></tr></tfoot>' +
            '</table>';
        expect(container.innerHTML).toBe(expectedHtml);
    });
});
