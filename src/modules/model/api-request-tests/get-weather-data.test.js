import aRImports from "../api-request";


/**
 * @jest-environment jsdom
*/
const { getWeatherData } = aRImports

describe('getWeatherData()', () => {   
    aRImports.getUrl = jest.fn().mockImplementation(() => {});
    aRImports.requestApi = jest.fn().mockImplementation(() => 'foo');
    beforeEach(() => {
        document.body.innerHTML = 
        '<input name="City" value="perth" >' 
        + '<input name="Country" value="au" >';
    });

    it('Calls dependencies and returns a promise', async () => {
        const weatherData = await getWeatherData();
        expect(aRImports.getUrl).toHaveBeenCalledTimes(2);
        expect(aRImports.requestApi).toHaveBeenCalledTimes(2);
        expect(weatherData).toBe('foo')
    });

    it('Returns null when <input name="City">.value property is empty', async () => {
        document.body.innerHTML = 
        '<input name="City" value="" >'
        + '<input name="Country" value="" >';
        const weatherData = await getWeatherData();
        expect(weatherData).toBeNull();
    });
    

    it('Logs specific error message when requestApi() dependency fails to retrieve data, then returns null', async () => {
        aRImports.requestApi = jest.fn().mockImplementation(() => undefined);
        const mockConsoleLog =  jest.spyOn(global.console, 'log').mockImplementation(() => {});
        const weatherData = await getWeatherData();

        expect(global.console.log).toHaveBeenCalledWith(
            'The city that was searched for has no associated weather data:',
            new TypeError('Cannot read property \'0\' of undefined')
        );
        expect(weatherData).toBeNull();
        mockConsoleLog.mockReset();
    });

    it('Returns null after logging generic error message when error that isn\'t "TypeError" is caught', async () => {
        aRImports.requestApi = jest.fn().mockImplementation(() => { 
            throw new Error('fooError') 
        });
        const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {});
        const weatherData = await getWeatherData();

        expect(global.console.error).toHaveBeenCalledWith(
            'An error occured in getWeatherData():',
            new Error('fooError')
        );
        expect(weatherData).toBeNull();
        mockConsoleError.mockReset();
    });
});

