import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
// import tCImports, { Temperatures }  from "./temperature-controls";


let container = document.createElement("div");
document.body.appendChild(container);

// jest.mock('../model/FilteringData', () => ({ filterData: jest.fn() }));

const addContext = temperatureControls => {
    const data = { 
        'daily': Array.from([,,,,,,,,], () => ({ 'day': null }) ) 
    },
    daysIncluded = null,
    headerStatus = { 
        'current': { 'tempUnit': null } 
    },
    setHeaderStatus = jest.fn(),
    setFilteredData = jest.fn()

    return (
        <Context.Provider value={{
            data, 
            daysIncluded, 
            headerStatus,
            setHeaderStatus,
            setFilteredData
        }}>
            <Temperatures />
        </Context.Provider>
  )
};

describe('<Temperatures />', () => {
    let mockInputs;
    it('Returns an array of two labels', () => {
    //   mockInputs = jest.spyOn(tCImports, 'Inputs').mockImplementation(() => 'foo');
      const componentToRender = addContext();
      act(() => { render(componentToRender, container) });
      expect(container.innerHTML).toBe('foofoo');
    });

    it('Updates temperatures in "data" from celsius to fahrenheit', () => {
        mockInputs.mockRestore()
        const renderHtml = htmlToRender();
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

    it('Updates temperatures in "data" from fahrenheit to celsius', () => {
        
    });
});  
