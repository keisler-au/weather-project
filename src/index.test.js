// input element accepts only letters
// debounce function triggers event handler
// event.value.toLowerCase()

import { expect, beforeEach, afterEach, beforeAll } from '@jest/globals'
import { it } from 'jest-circus'
import { describe } from 'yargs'
import { enableMocks } from 'jest-fetch-mock'

import { userEvent } from '@testing-library/user-event'



import { citySearchDebounce } from '/index.js'



// organise imports, structure of tests, when mock function/timer methods are used (before blocks?)

/**
 * @jest-environment jsdom
 */

// this call may not work as same as books.test.js
enableMocks();

jest.useFakeTimers()

// test event listener = mock keyboard event, expect debounce to be called
// test debounce function = mock timer, expect callback to be called
// test callback function = expect function to return data

document.body.innerHTML += `<form>
<input type="text" name="city">
<input type="text" name="counry">
<button type="button" name="metric">Metric</button>
<button type="button" name="imperial">Imperial</button>
</form>`;
describe('event listeners and debounce', () => {
    it('calls debounce after keypress in city input', () => {
        expect(debounce).toHaveBeenCalledTimes(0);
        const citySearchInput = document.querySelector('input[name="city"]');
        userEvent.type(citySearchInput, 'f');
        expect(debounce).toHaveBeenCalledTimes(1);
    });
    it(' calls debounce after keypress in country input', () => {
        expect(debounce).toHaveBeenCalledTimes(0);
        const countrySearchInput = document.querySelector('input[name=city]');
        userEvent.type(countrySearchInput, 'f');
        expect(debounce).toHaveBeenCalledTimes(1);
    });
    it('calls debounce after click event on metric button', () => {
        expect(debounce).toHaveBeenCalledTimes(0);
        // this may or may not work = not same as in App.test.js
        const metricButton = document.querySelector('button[name=metric]');
        userEvent.click(metricButton, {button: 0});
        expect(debounce).toHaveBeenCalledTimes(1);
    })
    it('calls debounce after click event on imperial button', () => {
        expect(debounce).toHaveBeenCalledTimes(0);
        // this may or may not work = not same as in App.test.js
        const imperialButton = document.querySelector('button[name=imperial]');
        userEvent.click(imperialButton, {button: 0});
        expect(debounce).toHaveBeenCalledTimes(1);
    })
    test('it waits 3000ms after last keypress event before calling callback', () => {
        const mockCallback = jest.fn();
        debounce(mockCallback, 2000)();
        expect(mockCallback).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(2000);
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
});

describe('once user types a city into <input>', () => {
    it('returns a url from Geocoding API', () => {
        expect(getGeoUrl('foo')).toBe(`http://api.openweathermap.org/geo/1.0/direct?q=foo&appid=410fd56e8e5c7d0fd3399015060b1dd0`)
    });
    it('returns a url from One Call API', () => {
        expect(getWeatherUrl('foo', 'bar', 'baz')).toBe(`https://api.openweathermap.org/data/2.5/onecall?lat=foo&lon=bar
        &exclude=minutely,alerts&units=baz&appid=410fd56e8e5c7d0fd3399015060b1dd0`)
    });
    it('returns data from a fetch() response',() => {
        fetchMock.mockReset();
        fetchMock.mockResponse(JSON.stringify({'foo':'bar'}));
        callApi('foo');
        expect(fetchMock.mock.calls.length).toEqual(1); 
        expect(callApi('foo')).toBe({'foo':'bar'});
    });
});

describe('once user types country into <input>', () => {
    // checks to see if city entered into <input "city">
    // if (city) = 

});

describe('unit checkboxes', () => {

});
