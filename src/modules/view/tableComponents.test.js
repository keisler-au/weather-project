import { render, unmountComponentAtNode } from "react-dom"
import React from "react"
import {act} from "react-dom/test-utils" 

import { Context } from "./app";
import {Tables, DayHeaders, CreateRows} from "./tableComponents"


let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders a row of <th> with content dependant on "data" variable', () => {
    const data = {'daily': [{'day': 'foo'}, {'day': 'bar'}, {'day': ''}]},
    daysIncluded = [0, 1, 2];
    act(() => {
        render(
            <Context.Provider value={{data, daysIncluded}}>
                <table>
                    <DayHeaders />
                </table>
            </Context.Provider>,
            container
        );
    });
    expect(container.textContent).toBe('\u00a0foobarDay 3')
});

function callCreateRows(tableContent) {
    act(() => {
        render(
            <table>
                <tbody>
                    <CreateRows tableContent={tableContent} />
                </tbody>
            </table>,
            container
        );
    });
}

it('renders a row with one <th> and one or multiple <td> depending on type of "data" variable', () => {
    callCreateRows({'foo': [{'foo': 'bar'}, {'foo': 'baz'}]});
    expect(container.textContent).toBe('foobarbaz');
    callCreateRows({'foo': 'bar'});
    expect(container.textContent).toBe('foobar');
});

it('creates tables', () => {
    const data = {
        'location': {'foo': 'bar', 'bar': 'baz' },
        'current': {'foo':'bar', 'bar': 'baz', 'baz': 'foo'},
        'daily': [{'day': 'foo'}, {'day': 'bar'}, {'day': ''}]
    },
    daysIncluded = [0, 1, 2],
    filters = {
        'current': {'foo':true, 'bar':true, 'baz': false},
        'daily': {'day': true}
    },
    filteredData = {        
        'current': {'foo':'bar', 'bar': 'baz', 'baz': 'foo'},
        'daily': [{'day': 'foo'}, {'day': 'bar'}, {'day': ''}]
    };
    act(() => {
        render(
            <Context.Provider value={{data, daysIncluded, filters}}>
                <Tables filteredData={filteredData} />
            </Context.Provider>,
            container
        );
    });
    expect(container.textContent).toBe('\u00a0foobarDay 3')
});