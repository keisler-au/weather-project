import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';

import { Context } from '../../modules/view/app';
import { DayHeaders } from '../../modules/view/table-components';


let container = document.createElement('div');
document.body.appendChild(container);

const renderTable = (data, forecastedDays) => {
        act(() => {
            render(
                <Context.Provider value={{data, forecastedDays}}>
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
    let data = {}, forecastedDays, thNodes;
    it('Returns row with number and content of <th> nodes reflective of "forecastedDays"', () => {
        // eslint-disable-next-line no-sparse-arrays
        data.forecasted = Array.from([, , , , , ,], () => ({ 'Date': '' }));
        forecastedDays = [4];
        renderTable(data, forecastedDays);
        thNodes = '<th>Day<br>5</th>';
        expect(container.innerHTML).toBe(expectedHtmlTemplate(thNodes));
        forecastedDays = [0, 1, 2, 3, 4, 5];
        renderTable(data, forecastedDays);
        thNodes = 
            '<th>Day<br>1</th>' +
            '<th>Day<br>2</th>' +
            '<th>Day<br>3</th>' +
            '<th>Day<br>4</th>' +
            '<th>Day<br>5</th>' +
            '<th>Day<br>6</th>';
        expect(container.innerHTML).toBe(expectedHtmlTemplate(thNodes));
    });
    it('Returns a row of <th> nodes containing content from "data.forecasted[x].Date"', () => {
        data.forecasted = [
            {'Date': 'Mon 24'}, 
            {'Date': 'Tue 25'}, 
            {'Date': 'Wed 26'}
        ];
        forecastedDays = [0, 1, 2];
        renderTable(data, forecastedDays);
        thNodes = 
            '<th>Mon<br>24</th>' +
            '<th>Tue<br>25</th>' +
            '<th>Wed<br>26</th>';
        expect(container.innerHTML).toBe(expectedHtmlTemplate(thNodes));
    });
});
