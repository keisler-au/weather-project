import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import { renderToStaticMarkup } from "react-dom/server";

import { CreateRows } from "../TableComponents"


let container = document.createElement("div");
document.body.appendChild(container);

function renderTable(data) {
    act(() => {
        render(
            <table>
                <tbody>
                    <CreateRows tableContent={data} />
                </tbody>
            </table>,
            container
        );
    });
};

describe('<CreateRows />', () => {
    let data;
    it('Returns an array of <tr>, with one <th> and <td> inside each <tr>', () => {
        data = { 
            'fooHeader': 'barContent',
            'barHeader': 'bazContent'
        };
        renderTable(data);
        const expectedHtml = 
            <table>
                <tbody>
                    <tr>
                        <th scope="row">fooHeader</th>
                        <td>barContent</td>
                    </tr>
                    <tr>
                        <th scope="row">barHeader</th>
                        <td>bazContent</td>
                    </tr>
                </tbody>
            </table>;

        expect(container.innerHTML).toBe(renderToStaticMarkup(expectedHtml));
    });

    it('Returns an array of <tr> with one <th> and multiple <td> when there is only one content of data per header in "data" input', () => {
        data = { 
            'fooHeader': [
                {'fooHeader': 'barContent'}, 
                {'fooHeader': 'barContent'}
            ],
            'barHeader': [
                {'barHeader': 'bazContent'},
                {'barHeader': 'bazContent'}
            ]
        };
        renderTable(data);
        const expectedHtml = 
            <table>
                <tbody>
                    <tr>
                        <th scope="row">fooHeader</th>
                        <td>barContent</td>
                        <td>barContent</td>
                    </tr>
                    <tr>
                        <th scope="row">barHeader</th>
                        <td>bazContent</td>
                        <td>bazContent</td>
                    </tr>
                </tbody>
            </table>;

        expect(container.innerHTML).toBe(renderToStaticMarkup(expectedHtml));
    });
});
