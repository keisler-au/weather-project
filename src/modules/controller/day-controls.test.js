import { act } from "react-dom/test-utils";
import React from "react"
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import dCImports, { Days }  from "./DayControls";


let container = document.createElement("div");
document.body.appendChild(container);

jest.mock('../model/FilteringData', () => ({ filterData: jest.fn() }));

const daysIncluded = [0, 1, 2, 3, 4, 5, 6, 7],
data = { 'daily': Array.from(daysIncluded, () => ({'day': null})) },
setDaysIncluded = jest.fn(),
headerStatus = { 
    'current': {
        'Temperature': null, 
        'Rain': null, 
        'Clouds': null
    }
},
setFilteredData = jest.fn(),
htmlToRender = dayControls => {
    return (
        <Context.Provider value={
            {
            data, 
            daysIncluded, 
            setDaysIncluded,
            headerStatus,
            setFilteredData
            }
        }>
            {dayControls}
        </Context.Provider>
  )
};

describe('<CategoryControls />', () => {
    let mockInputs;
    it('Returns an array of returned <Inputs /> values of length of "wholeWeek" ', () => {
      mockInputs = jest.spyOn(dCImports, 'Inputs').mockImplementation(() => 'foo');
      const renderHtml = htmlToRender(<Days />)
      act(() => { render(renderHtml, container) });
      expect(container.innerHTML).toBe('foofoofoofoofoofoofoofoo');
    });

    it('Calls dayDisplay() after "onChange" event of day checbox', () => {
        mockInputs.mockRestore()
        const renderHtml = htmlToRender(<Days />)
        act(() => { render(renderHtml, container) });

        expect(setDaysIncluded).toHaveBeenCalledTimes(0);
        const day1CheckBox = container.querySelector('[name="1"]');
        userEvent.click(day1CheckBox);
        expect(setDaysIncluded).toHaveBeenCalledTimes(1);

        userEvent.click(day1CheckBox);
        expect(setDaysIncluded).toHaveBeenCalledTimes(2);
    
        const day2CheckBox = container.querySelector('[name="2"]');
        userEvent.click(day2CheckBox);
        expect(setDaysIncluded).toHaveBeenCalledTimes(3);
      });
});  
