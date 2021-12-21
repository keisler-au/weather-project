import { act } from "react-dom/test-utils";
import React from "react"
import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'

import { Context } from "../App";
import tCImports, { Tables } from "../TableComponents";


let container = document.createElement("div");
document.body.appendChild(container);

describe('<Tables />', () => {
    it('Renders three tables with specific titles and mocked data', () => {
        tCImports.DayHeaders = jest.fn().mockImplementation(() => {
            return (
                <thead>
                    <tr>
                        <td>DayHeaders</td>
                    </tr>
                </thead>
            )
        });
        tCImports.CreateRows = jest.fn().mockImplementation(() => {
            return (
                <tr>
                    <td>RowData</td>
                </tr>
            )
        });

        const data = {
            'location': null
        },
        filteredData = {        
            'current': null,
            'daily': null,
        },
        headerStatus = {
            'daily': null
        };    

        act(() => {
            render(        
                <Context.Provider value={{ data, headerStatus }}>
                    <Tables filteredData={filteredData} />
                </Context.Provider>, 
                container
            )
        });
        
        const expectedHtml = 
            <>
                <table>
                    <caption>Location</caption>
                    <tbody>
                        <tr>
                            <td>RowData</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <caption>Current Weather</caption>
                    <tbody>
                        <tr>
                            <td>RowData</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <caption>8 Day Forecast</caption>
                    <thead>
                        <tr>
                            <td>DayHeaders</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RowData</td>
                        </tr>
                    </tbody>
                </table>
            </>

        expect(container.innerHTML).toBe(renderToStaticMarkup(expectedHtml))
    });
});
