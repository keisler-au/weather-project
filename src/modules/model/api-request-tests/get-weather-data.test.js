import aRImports from "../api-request";

/**
 * @jest-environment jsdom
*/

const { getWeatherData } = aRImports,
documentBody = (city='', country='') => (
    `<form>
    <label><input value="${city}"></label>
    <div><label><input value="${country}"></label></div>
    </form>`
);

describe('getWeatherData()', () => {   
    beforeEach(() => {
        document.body.innerHTML = documentBody('perth', 'au');
    });
    it('Returns a promise', async () => {
        aRImports.requestApi = jest.fn(() => 'foo');
        const weatherData = await getWeatherData();
        expect(weatherData).toBe('foo');
    });
    it('Returns null when <input name="City">.value property is empty', async () => {
        document.body.innerHTML = documentBody();
        const weatherData = await getWeatherData();
        expect(weatherData).toBeNull();
    });
    it('Logs specific error message when requestApi() dependency fails to retrieve data, then returns null', async () => {
        aRImports.requestApi = jest.fn();
        const mockConsoleLog = jest.spyOn(global.console, 'log').mockImplementation(() => {}),
        weatherData = await getWeatherData();
        expect(global.console.log).toHaveBeenCalledWith(
            'The city that was searched for has no associated weather data:',
            new TypeError("Cannot read property '0' of undefined")
        );
        expect(weatherData).toBeNull();
        mockConsoleLog.mockReset()
    });
    it('Returns null after logging generic error message when error that isn\'t "TypeError" is caught', async () => {
        aRImports.requestApi = jest.fn(() => { throw new Error('fooError') });
        const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {}),
        weatherData = await getWeatherData();
        expect(global.console.error).toHaveBeenCalledWith(
            'An error occured in getWeatherData():',
            new Error('fooError')
        );
        expect(weatherData).toBeNull();
        mockConsoleError.mockReset();
    });
});

