import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';

import userEvent from '@testing-library/user-event';

import { Context } from '../../modules/view/app';
import LocationFilter  from '../../modules/controller/location-controls';


let container = document.createElement('div');
document.body.appendChild(container);

jest.mock('../../modules/model/filtering-data', () => ({ filterData: jest.fn() }));
jest.mock('../../modules/model/api-request', () => ({ getWeatherData: jest.fn() }));
jest.mock('../../modules/model/parsing-data', () => ({ parseData: jest.fn() }));

const setData = jest.fn(),
    forecastedDays = null,
    headerStatus = { 'current': null, 'forecasted': null },
    setFilteredData = jest.fn();

const renderComponent = location => {
    const componentToRender = 
        <Context.Provider value={
            {
                setData, 
                forecastedDays, 
                headerStatus, 
                setFilteredData
            }
        }>
            <LocationFilter location={location} />
        </Context.Provider>;
    act(() => { render(componentToRender, container); });
};

describe('<LocationInputs />', () => {
    it('Returns a <label> element', () => {
        renderComponent('City');
        expect(container.innerHTML).toBe('<label>City<input type="text" id="city"></label>');
    });

    it('Calls setTimeout callback function after 2000ms from last "onChange" event', async () => {
        jest.useFakeTimers();
        renderComponent('Country');
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