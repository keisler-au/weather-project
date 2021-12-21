import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import { renderToStaticMarkup } from "react-dom/server";

import { Context } from "../App";
import { DayHeaders } from "../TableComponents";


let container = document.createElement("div");
document.body.appendChild(container);

describe('<DayHeaders />', () => {
    it('Renders one <tr> of <th> with content from "data: {daily}"', () => {
        const data = {'daily': [
            {'day': 'foo'}, 
            {'day': 'bar'}, 
            {'day': ''}
        ]},
        daysIncluded = [0, 1, 2];
        act(() => {
            render(
                <Context.Provider value={{
                    data, 
                    daysIncluded
                    }
                }>
                    <table>
                        <DayHeaders />
                    </table>
                </Context.Provider>,
                container
            );
        });
        const expectedHtml = 
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>foo</th>
                        <th>bar</th>
                        <th>Day 3</th>
                    </tr>
                </thead>
            </table>;

        expect(container.innerHTML).toBe(renderToStaticMarkup(expectedHtml));
    });
});
