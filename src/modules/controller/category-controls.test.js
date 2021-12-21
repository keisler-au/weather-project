import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";
import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import cCImports, { Categories }  from "./CategoryControls";


let container = document.createElement("div");
document.body.appendChild(container);

jest.mock('../model/FilteringData', () => ({ filterData: jest.fn() }));

const categories = ['Temperature', 'Rain', 'Clouds'],
data = null,
daysIncluded = null,
headerStatus = { 
    'current': {
        'Temperature': null, 
        'Rain': null, 
        'Clouds': null
    }
},
setHeaderStatus = jest.fn(),
setFilteredData = jest.fn(),
htmlToRender = categoryControls => {
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
            {categoryControls}
        </Context.Provider>
  )
};

describe('<CategoryControls />', () => {
    let mockInputs;
    it('Returns an array of returned <Inputs /> values of length of "categories" ', () => {
      mockInputs = jest.spyOn(cCImports, 'Inputs').mockImplementation(() => 'foo');
      const renderHtml = htmlToRender(<Categories table="current" categories={categories} />);
      act(() => { render(renderHtml, container) });
      expect(container.innerHTML).toBe('foofoofoo');
    });

    it('Calls categoryDisplay() after "onChange" event of category checbox', () => {
        mockInputs.mockRestore();
        const renderHtml = htmlToRender(<Categories table="current" categories={categories} />);
        act(() => { render(renderHtml, container) });
        
        expect(setHeaderStatus).toHaveBeenCalledTimes(0);
        const tempCheckBox = container.querySelector('[name="Temperature"]');
        userEvent.click(tempCheckBox);
        expect(setHeaderStatus).toHaveBeenCalledTimes(1);

        userEvent.click(tempCheckBox);
        expect(setHeaderStatus).toHaveBeenCalledTimes(2);
    
        const rainCheckBox = container.querySelector('[name="Rain"]');
        userEvent.click(rainCheckBox);
        expect(setHeaderStatus).toHaveBeenCalledTimes(3);
      });
});  
