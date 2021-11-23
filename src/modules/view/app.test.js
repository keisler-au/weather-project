import { expect, beforeEach, afterEach, beforeAll } from '@jest/globals'
import { enableMocks } from 'jest-fetch-mock'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { userEvent } from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import { render, unmountComponentAtNode } from "react-dom"
import {textDebounce, getGeoUrl, callApi, getWeatherUrl,
        getWeatherData, TextLocation, 
        RadioUnit, App } from './App';
// organise imports, structure of tests, when mock function/timer methods are used (before blocks?)
// cleaning input = handling, reporting, not-found or mispelled cities


/**
 * @jest-environment jsdom
 */

// this call may not work as same as books.test.js
enableMocks();
// jest.useFakeTimers(); = not needed now in beforeEach block?
// understand this container setup
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

// document.body.innerHTML += `<form>
// <input type="text" id="city">
// <input type="text" id="counry">
// <input type="radio" id="metric" name="unit" />
// <input type="radio" id="imperial" name="unit" />
// </form>`;

// == testing App == 
// ** 
// mock setData
// ** debounce & event listeners 
// trigger cityInput onChange event
// test textDebounce gets called
// test mockSetData not called
// run fake timer = 2000ms
// test mockSetData gets called
// **
// trigger countryInput onChange event
// ... ... ... ...
// **
// trigger metricInput onClick event
// test radioHandler gets called
// test setCheck gets called
// test checked value gets updated?
// test mockSetData gets called 
// ** 
// trigger imperialInput onClick event
// ... ... ... ... 
// **
// mock setData 
// trigger change in data (with mockSetData)
// test data of mockSetData is renderd on screen 
describe('testing App component', () => {
  describe('debounce and event listeners', () => {
    it('updates on city search input', () => {
      const app = render(<App />, container)
      const getWeatherDataMock = jest.spyOn(textDebounce, 'getWeatherData').mockImplementation(() => 'bar')
      expect(textDebounce).toHaveBeenCalledTimes(0)
      const cityInput = container.querySelector('input[id=city]')
      // userEvent.type(cityInput, 'perth')
      fireEvent.change(cityInput, {target: {value: 'perth'}})
      expect(textDebounce).toHaveBeenCalledTimes(1)
      expect(getWeatherDataMock).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(2000);
      expect(getWeatherDataMock).toHaveBeenCalledTimes(1)


        // appComp.setState()
        // const mockedDebounce = jest.spyOn(appComp, 'textDebounce')
        // expect(mockedDebounce).toHaveBeenCalledTimes(0);
        // const citySearchInput = document.querySelector('input[name="city"]');
        // userEvent.type(citySearchInput, 'f');
        // expect(mockedDebounce).toHaveBeenCalledTimes(1);
        // const countrySearchInput = document.querySelector('input[name=city]');
        // userEvent.type(countrySearchInput, 'f');
        // expect(mockedDebounce).toHaveBeenCalledTimes(2);
    });
        
    });
  });
  //   test('debouncer waits 2000ms after last onchange event before calling callback', () => {
  //     const mockedCallback = jest.spyOn(App, "setData").mockImplementation(() => 'foo');
  //     // render(<App />); ?
  //     App();
  //     expect(mockCallback).toHaveBeenCalledTimes(0);
  //     jest.advanceTimersByTime(2000);
  //     expect(mockCallback).toHaveBeenCalledTimes(1);
  //   });
  //   it('calls handler after onclick event on metric input-radio', () => {
  //       expect(debounce).toHaveBeenCalledTimes(0);
  //       // this may or may not work = not same as in App.test.js
  //       const metricButton = document.querySelector('button[name=metric]');
  //       userEvent.click(metricButton, {button: 0});
  //       expect(debounce).toHaveBeenCalledTimes(1);
  //   })
  //   it('calls handler after onclick event on imperial input-radio', () => {
  //       expect(debounce).toHaveBeenCalledTimes(0);
  //       // this may or may not work = not same as in App.test.js
  //       const imperialButton = document.querySelector('button[name=imperial]');
  //       userEvent.click(imperialButton, {button: 0});
  //       expect(debounce).toHaveBeenCalledTimes(1);
  //   })
  // });
  // test('renders form controls', () => {
  //   render(<App />);
  //   const linkElement = screen.getByText(/city: country:/i);
  //   expect(linkElement).toBeInTheDocument();
  // });



// == testing getGeoUrl ==
// test gets called with 2 string parameters = or use type hint?
// test returns a URL string with parameters included

// == testing callApi ==
// **
// mock fetch response = resolved
// test gets called with 1 string parameter = type hint?
// test returns resolved response 
// **
// mock fetch response = rejected
// test gets called with 1 string parameter
// test error is logged to console

// == testing getWeatherUrl == 
// test gets called with 2 string parameters = type hint?
// mock unit variable?
// test returns a URL string with parameters (unit variable) included

// describe('functions for making requests to API's', () => {
//   it('returns a url for request to Geocoding API', () => {
//       expect(getGeoUrl('foo')).toBe(`http://api.openweathermap.org/geo/1.0/direct?q=foo&appid=410fd56e8e5c7d0fd3399015060b1dd0`)
//   });
//   it('returns data from a fetch() request',() => {
//       fetchMock.mockReset();
//       fetchMock.mockResponse(JSON.stringify({'foo':'bar'}));
//       callApi('foo');
//       expect(fetchMock.mock.calls.length).toEqual(1); 
//       expect(callApi('foo')).toBe({'foo':'bar'});
//   });
//   it('returns a url for request to One Call API', () => {
//       expect(getWeatherUrl('foo', 'bar', 'baz')).toBe(`https://api.openweathermap.org/data/2.5/onecall?lat=foo&lon=bar
//       &exclude=minutely,alerts&units=baz&appid=410fd56e8e5c7d0fd3399015060b1dd0`)
//   });
// });


// write up labels and correct HTML format for current form controls
// draw up plan for 
  // components and functions of form controls (filters)
  // and how they will interact with HTML table
// write up test / plan tests / for filter form controls


