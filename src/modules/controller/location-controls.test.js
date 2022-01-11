import { act } from "react-dom/test-utils";
import React from "react"
import { render } from "react-dom";

import userEvent from "@testing-library/user-event";

import { Context } from "../view/app";
import lCImports, { LocationInput }  from "./location-controls";


let container = document.createElement("div");
document.body.appendChild(container);

jest.mock('../model/filtering-data', () => ({ filterData: jest.fn() }));
jest.mock('../model/api-request', () => ({ getWeatherData: jest.fn() }));
jest.mock('../model/parsing-data', () => ({ parseData: jest.fn() }));

const setData = jest.fn(),
daysIncluded = null,
headerStatus = { 'current': null, 'daily': null },
setFilteredData = jest.fn(),
htmlToRender = locationInputs => {
  return (
    <Context.Provider value={
      {
        setData, 
        daysIncluded, 
        headerStatus, 
        setFilteredData
      }
    }>
      {locationInputs}
    </Context.Provider>
  )
};

describe('<LocationInputs />', () => {
  let mockInputs;
  it('Returns a <label> element', () => {
    // mockInputs = jest.spyOn(lCImports, 'Inputs').mockImplementation(() => 'foo');
    const renderHtml = htmlToRender(<LocationInput />);
    act(() => { render(renderHtml, container) });
    expect(container.innerHTML).toBe('foo');
  });

  it('Calls setTimeout callback function after 2000ms from last "onChange" event', async () => {
    jest.useFakeTimers();
    mockInputs.mockRestore()
    const renderHtml = htmlToRender(<LocationInput />);
    act(() => { render(renderHtml, container) });

    const cityInput = container.querySelector('input');
    userEvent.type(cityInput, 'perth');
    expect(setData).toHaveBeenCalledTimes(0);
    jest.runTimersToTime();
    await Promise.resolve();
    expect(setData).toHaveBeenCalledTimes(1);

    // const countryInput = container.querySelector('form > div > label:first-child > input');
    // userEvent.type(countryInput, 'au');
    // expect(setData).toHaveBeenCalledTimes(1);
    // jest.runTimersToTime();
    // await Promise.resolve();
    // expect(setData).toHaveBeenCalledTimes(2);
  });
});