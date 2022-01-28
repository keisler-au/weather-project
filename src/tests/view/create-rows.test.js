import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";

import { CreateRows } from "./all-table-components"


let container = document.createElement("div");
document.body.appendChild(container);

const renderTable = data => {
    act(() => {
        render(
            <table><CreateRows tableContent={data} /></table>,
            container
        );
    });
},
expectedHtmlTemplate = tdNodes => (
    '<table><tbody>' +
        '<tr class="time-row">' +
            '<th scope="row">Date</th>' +
            `${tdNodes[0]}` +
        '</tr>' +
        '<tr class="time-row">' +
            '<th scope="row">Time</th>' +
            `${tdNodes[1]}` +
        '</tr>' +
        '<tr class="">' +
            '<th scope="row">foo</th>' +
            `${tdNodes[2]}` +
        '</tr>' +
    '</tbody></table>'
);

describe('<CreateRows />', () => {
    let data, tdNodes;
    it('Returns an array, with the <td> node in each <tr> corresponding to the "data" object', () => {
        data = { 
            'Date': 'dateData',
            'Time': 'timeData',
            'foo': 'fooData'
        };
        renderTable(data);
        tdNodes = [
            '<td>dateData</td>',
            '<td>timeData</td>',
            '<td>fooData</td>'
        ];
        expect(container.innerHTML).toBe(expectedHtmlTemplate(tdNodes));
    });

    it('Returns an array, with multiple <td> nodes in each <tr> corresponding to "data"', () => {
        data = {
            'Date': ['dateData', 'dateData', 'dateData'],
            'Time': ['timeData', 'timeData', 'timeData'],
            'foo': ['fooData', 'fooData', 'fooData']
        };
        renderTable(data);
        tdNodes = [
            '<td>dateData</td><td>dateData</td><td>dateData</td>',
            '<td>timeData</td><td>timeData</td><td>timeData</td>',
            '<td>fooData</td><td>fooData</td><td>fooData</td>'
        ];
        expect(container.innerHTML).toBe(expectedHtmlTemplate(tdNodes));
    });
});
