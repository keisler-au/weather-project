import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import tCImports, { Temperatures }  from "./temperature-controls";


let container = document.createElement("div");
document.body.appendChild(container);

jest.mock('../model/FilteringData', () => ({ filterData: jest.fn() }));

const data = { 
    'daily': Array.from([,,,,,,,,], () => ({ 'day': null }) ) 
},
daysIncluded = null,
headerStatus = { 
    'current': { 'tempUnit': null } 
},
setHeaderStatus = jest.fn(),
setFilteredData = jest.fn(),
htmlToRender = temperatureControls => {
    return (
        <Context.Provider value={
            {
            data, 
            daysIncluded, 
            headerStatus,
            setHeaderStatus,
            setFilteredData
            }
        }>
            {temperatureControls}
        </Context.Provider>
  )
};

describe('<CategoryControls />', () => {
    let mockInputs;
    it('Returns an array of values returned from two calls to <Inputs />', () => {
      mockInputs = jest.spyOn(tCImports, 'Inputs').mockImplementation(() => 'foo');
      const renderHtml = htmlToRender(<Temperatures />);
      act(() => { render(renderHtml, container) });
      expect(container.innerHTML).toBe('foofoo');
    });

    it('Calls changeUnit() after "onChange" event of temperature unit checbox', () => {
        mockInputs.mockRestore()
        const renderHtml = htmlToRender(<Temperatures />);
        act(() => { render(renderHtml, container) });
        
        expect(setHeaderStatus).toHaveBeenCalledTimes(0);
        const celsiusRadio = container.querySelector('label:nth-of-type(1) input');
        userEvent.click(celsiusRadio); 
        expect(setHeaderStatus).toHaveBeenCalledTimes(1);

        userEvent.click(celsiusRadio); 
        expect(setHeaderStatus).toHaveBeenCalledTimes(2);
    
        const fahrenheitRadio = container.querySelector('label:nth-of-type(2) input');
        userEvent.click(fahrenheitRadio);
        expect(setHeaderStatus).toHaveBeenCalledTimes(3);
      });
});  
