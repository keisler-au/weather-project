/* eslint-disable no-undef */
import { enableMocks } from 'jest-fetch-mock';

import imports, { getWeatherData, requestApi } from '../../modules/model/api-request';


enableMocks();
describe('requestApi()', () => {
    afterEach(() => {
        fetchMock.mockReset();
    });
    it('Returns data retrieved from a fetch() request', async () => {
        fetchMock.mockResponse(JSON.stringify({ 'foo': 'bar' }));
        const requestData = await requestApi('mockUrl');
        expect(requestData).toEqual({ 'foo': 'bar' });
    });
    it('Logs error message when fetch() request fails to retrieve data', async () => {
        fetchMock.mockReject('fooError');
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
        const requestData = await requestApi('mockUrl');
        expect(global.console.error).toHaveBeenCalledWith(
            'An Error occured in requestApi:', 
            'fooError'
        );
        expect(requestData).toBeUndefined();
    });
});

describe('getWeatherData()', () => {   
    let weatherData;
    it('Returns null when "city" <input>.value is undefined', async () => {
        document.body.innerHTML = '<input id="city" value=""/><input id="country" value=""/>';
        weatherData = await getWeatherData();
        expect(weatherData).toBeNull();
        document.body.innerHTML = '<input id="city" value=""/><input id="country" value="au"/>';
        weatherData = await getWeatherData();
        expect(weatherData).toBeNull();
    });
    it('Returns a promise when "city" <input>.value is defined', async () => {
        imports.requestApi = jest.fn(() => 'mocked promise');
        document.body.innerHTML ='<input id="city" value="perth"/><input id="country" value="au"/>';
        weatherData = await getWeatherData();
        expect(imports.requestApi).toHaveBeenCalledWith('perth', 'au', true);
        expect(weatherData).toBe('mocked promise');

        document.body.innerHTML = '<input id="city" value="perth"/><input id="country" value=""/>';
        weatherData = await getWeatherData();
        expect(imports.requestApi).toHaveBeenCalledWith('perth', '', true);
        expect(weatherData).toBe('mocked promise');
    });
    it('Returns null after logging specific error message if "requestApi()" response is invalid', async () => {
        imports.requestApi = jest.fn(() => undefined);
        const mockConsoleLog = jest.spyOn(global.console, 'log').mockImplementation(() => {}),
            weatherData = await getWeatherData();
        expect(global.console.log).toHaveBeenCalledWith(
            'The city that was searched for has no associated weather data:',
            new TypeError('Cannot read property \'0\' of undefined')
        );
        expect(weatherData).toBeNull();
        mockConsoleLog.mockReset();
    });
    it('Returns null after logging generic error message when error that isn\'t "TypeError" is caught', async () => {
        imports.requestApi = jest.fn(() => { throw new ReferenceError('fooError'); });
        const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {}),
            weatherData = await getWeatherData();
        expect(global.console.error).toHaveBeenCalledWith(
            'An error occured in getWeatherData():',
            new ReferenceError('fooError')
        );
        expect(weatherData).toBeNull();
        mockConsoleError.mockReset();
    });

});

