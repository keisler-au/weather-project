import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";

import { Context } from "../app";
import { DayHeaders } from "./all-table-components";


let container = document.createElement("div");
document.body.appendChild(container);

const renderTable = (data, daysIncluded) => {
    act(() => {
        render(
            <Context.Provider value={{data, daysIncluded}}>
                <table><DayHeaders /></table>
            </Context.Provider>,
            container
        );
    });
},
expectedHtmlTemplate = thNodes => (
    '<table><thead>'
        +'<tr>'
            +'<th> </th>'
            +`${thNodes}`
        +'</tr>'
    +'</thead></table>'
);

describe('<DayHeaders />', () => {
    let data = {}, daysIncluded, thNodes;
    it('Returns row with number and content of <th> nodes reflective of "daysIncluded"', () => {
        data.daily = Array.from([, , , , , ,], () => ({ 'Date': '' }));
        daysIncluded = [4];
        renderTable(data, daysIncluded);
        thNodes = '<th>Day<br>5</th>';
        expect(container.innerHTML).toBe(expectedHtmlTemplate(thNodes));
        daysIncluded = [0, 1, 2, 3, 4, 5];
        renderTable(data, daysIncluded);
        thNodes = 
            '<th>Day<br>1</th>' +
            '<th>Day<br>2</th>' +
            '<th>Day<br>3</th>' +
            '<th>Day<br>4</th>' +
            '<th>Day<br>5</th>' +
            '<th>Day<br>6</th>';
    expect(container.innerHTML).toBe(expectedHtmlTemplate(thNodes));
    });
    it('Returns a row of <th> nodes containing content from "data.daily[x].Date"', () => {
        data.daily = [
            {'Date': 'Mon 24'}, 
            {'Date': 'Tue 25'}, 
            {'Date': 'Wed 26'}
        ];
        daysIncluded = [0, 1, 2];
        renderTable(data, daysIncluded);
        thNodes = 
            '<th>Mon<br>24</th>' +
            '<th>Tue<br>25</th>' +
            '<th>Wed<br>26</th>';
        expect(container.innerHTML).toBe(expectedHtmlTemplate(thNodes));
    });
});
