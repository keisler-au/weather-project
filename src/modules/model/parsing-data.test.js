import pDImports, { getDateString, parseData } from "./ParsingData";
import { emptyDataTemplate } from "../view/App";


describe('getDateString()', () => {
    const unixTime = 1638251746;
    it('converts unixTime stamp to time string', () => {
        const timeString = getDateString(unixTime);
        expect(timeString).toBe('13:55:46')

    });
    
    it('converts unix time stamp to date string', () => {
        const dateString = getDateString(unixTime, false);
        expect(dateString).toBe('Tue 30 ')
    });
});

describe('parseData()', () => {
    const oneDaysData = {
        dt: 'mocked',
        temp: 't', 
        clouds: 'c', 
        rain: 100, 
        wind_speed: 1, 
        humidity: 'h', 
        weather: [{description: 'd'}], 
        sunrise: 'mocked',
        sunset: 'mocked'
    },
    data = { 
        timezone: 't',
        lat: 'la', 
        lon: 'lo', 
        current: oneDaysData,
        daily: [0, 1, 2].map(() => ({
            ...oneDaysData, 
            'temp': {'day': 't'} 
        }))
    };

    pDImports.getDateString = jest.fn().mockReturnValue('mockedTime')

    it('Parses "data" input, returns a parsed dataset', () => {
        const expectedOneDay = {
            'Temperature': 't \u00B0C', 
            'Clouds': 'c%',
            'Rain': '100 mm', 
            'Wind': '1.94 kn',
            'Humidity': 'h%',
            'Description': 'D',
            'Sunrise': 'mockedTime',
            'Sunset': 'mockedTime' 
        },
        expectedParsedData = {
            location: {
                'Timezone': 't', 
                'Latitude': 'la', 
                'Longditude': 'lo'
            },
            current: {
                'Date': 'mockedTime',
                'Time': 'mockedTime',
                ...expectedOneDay
            },
            daily: [0, 1, 2].map(() => ({ 
                    'day': 'mockedTime', 
                    ...expectedOneDay 
                })
            )
        };
        const parsedData = parseData(data);
        expect(parsedData).toEqual(expectedParsedData)
    });
    
    it('Logs a specific error message when an invalid "data" input is provided, returns an empty parsed dataset template', () => {
        const mockConsoleLog =  jest.spyOn(global.console, 'log').mockImplementation(() => {}),
        parsedData = parseData({});
        expect(global.console.log).toHaveBeenCalledWith(
            'Some data associated with the searched city is missing:',
            new TypeError('Cannot read property \'dt\' of undefined')
        );
        expect(parsedData).toEqual(emptyDataTemplate);
    });

    it('Logs a generic error message when error that isn\'t "TypeError" is caught', () => {
        pDImports.getDateString = jest.fn().mockImplementation(() => { 
            throw Error('fooError') 
        });
        const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {}),
        parsedData = parseData(data);

        expect(global.console.error).toHaveBeenCalledWith(
            'An error occured in parseData():',
            new Error('fooError')
        );
        expect(parsedData).toEqual(emptyDataTemplate);
    });
});