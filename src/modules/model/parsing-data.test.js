import { getDateString, convertTempData, parseData } from "./parsing-data";
import { emptyDataTemplate } from "../view/app";


describe('getDateString()', () => {
    const unixTime = 1638251746;
    it('converts unixTime stamp to time string', () => {
        const timeString = getDateString(unixTime);
        expect(timeString).toBe('13:55')

    });
    it('converts unix time stamp to date string', () => {
        const dateString = getDateString(unixTime, false);
        expect(dateString).toBe('Tue 30 ')
    });
});

describe('convertTempData()', () => {
    let data,
    expectedConvertedData;
    it('converts celsius temperature to fahhrenheit', () => {
        data = { 'Temperature': 0 },
        expectedConvertedData = { 'Temperature': 32 };
        expect(convertTempData(data)).toEqual(expectedConvertedData);
    });
    it('converts fahrenheit temperature to celsius', () => {
        data = { 'Temperature': 32 },
        expectedConvertedData = { 'Temperature': 0 };
        expect(convertTempData(data, false)).toEqual(expectedConvertedData);
    });
});

describe('parseData()', () => {
    document.body.innerHTML = '<input type="checkbox" id="fahrenheit" />';
    const singleDaysData = {
        'dt': 1638251746,
        'temp': 20,
        'clouds': 'clouds', 
        'rain': 100, 
        'wind_speed': 1, 
        'humidity': 'humidity', 
        'weather': [{'description': 'description'}], 
        'sunrise': 1638222746,
        'sunset': 1638268746,
    },
    data = { 
        'timezone': 'timezone',
        'current': singleDaysData,
        'daily': [0, 1, 2].map(() => ({
            ...singleDaysData, 
            'temp': { 'day': 20 } 
        }))
    };
    
    it('Parses "data" input, returns a parsed dataset', () => {
        const expectedSingleDaysData = {
            'Date': 'Tue 30 ',
            'Temperature': 20, 
            'Clouds': 'clouds',
            'Rain': 100, 
            'Wind': 2,
            'Humidity': 'humidity',
            'Description': 'Description',
            'Sunrise': '05:52',
            'Sunset': '18:39' 
        },
        expectedParsedData = {
            location: {
                'Timezone': 'timezone'
            },
            current: {
                'Date': 'Tue 30 ',
                'Time': '13:55',
                ...expectedSingleDaysData
            },
            daily: [0, 1, 2].map(() => expectedSingleDaysData)
        };
        const parsedData = parseData(data);
        expect(parsedData).toEqual(expectedParsedData)
    });    


    it('Logs a specific error message when an invalid "data" input is provided, returns an empty parsed dataset template', () => {
        const mockConsoleLog =  jest.spyOn(global.console, 'log').mockImplementation(() => {});
        const parsedData = parseData({});
        expect(global.console.log).toHaveBeenCalledWith(
            'Some data associated with the searched city is missing:',
            new TypeError('Cannot read property \'dt\' of undefined')
        );
        expect(parsedData).toEqual(emptyDataTemplate);
        mockConsoleLog.mockRestore();
    });

    // it('Logs a generic error message when error that isn\'t "TypeError" is caught', () => {
    //     jest.mock('../parsing-data', () => ({
    //         convertTempData :() => {throw Error('fooError')}
    //     }));
    //     // jest.fn().mockImplementation(() => { 
    //     //     throw Error('fooError') 
    //     // });
    //     jest.spyOn(global.console, 'error').mockImplementation(() => {});
    //     const parsedData = parseData(data);
    //     expect(global.console.error).toHaveBeenCalledWith(
    //         'An error occured in parseData():',
    //         new Error('fooError')
    //     );
    //     expect(parsedData).toEqual(emptyDataTemplate);
    // });
});