import { act } from "react-dom/test-utils";
import React from "react"
import { render } from "react-dom";

import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import LocationFilter  from "./location-controls";


let container = document.createElement("div");
document.body.appendChild(container);

jest.mock('../model/filtering-data', () => ({ filterData: jest.fn() }));
jest.mock('../model/api-request', () => ({ getWeatherData: jest.fn() }));
jest.mock('../model/parsing-data', () => ({ parseData: jest.fn() }));

const setData = jest.fn(),
daysIncluded = null,
headerStatus = { 'current': null, 'daily': null },
setFilteredData = jest.fn();

const addContext = location => (
  <Context.Provider value={
    {
      setData, 
      daysIncluded, 
      headerStatus, 
      setFilteredData
    }
  }>
    <LocationFilter location={location} />
  </Context.Provider>
);

describe('<LocationInputs />', () => {
  it('Returns a <label> element', () => {
    const componentToRender = addContext('City');
    act(() => { render(componentToRender, container) });
    expect(container.innerHTML).toBe('<label>City<input type="text" id="city"></label>');
  });

  it('Calls setTimeout callback function after 2000ms from last "onChange" event', async () => {
    jest.useFakeTimers();
    const componentToRender = addContext('Country');
    act(() => { render(componentToRender, container) });

    const textInput = container.querySelector('input');
    userEvent.type(textInput, 'perth');
    expect(setData).toHaveBeenCalledTimes(0);
    jest.runTimersToTime();
    await Promise.resolve();
    expect(setData).toHaveBeenCalledTimes(1);

    userEvent.type(textInput, 'au');
    expect(setData).toHaveBeenCalledTimes(1);
    jest.runTimersToTime();
    await Promise.resolve();
    expect(setData).toHaveBeenCalledTimes(2);
  });
});