/* eslint-disable no-unused-expressions */
import { addCategoryMetric, filterData } from '../../modules/model/filtering-data';

describe('filterData() returns an object, the keys are all the categories in "filteredCategories" set to "true" (plus additional unit metrics), and the values for each key correspond to the information in "data" and "forecastedDays"', () => {
    let filteredData, 
        filteredCategories,
        expectedData,
        data = { 
            'current': {
                'Temperature': 0, 
                'Clouds': 50, 
                'Humidity': 100 
            },
            'forecasted': [ 
                {
                    'Wind': 150, 
                    'Rain': 200, 
                    'Description': 250
                },
                {
                    'Wind': 300, 
                    'Rain': 350, 
                    'Description': 400
                },
                {
                    'Wind': 450, 
                    'Rain': 500, 
                    'Description': 550
                }
            ]
        },
        forecastedDays = [0, 1, 2];
    beforeEach(() => {   
        filteredCategories = { 
            'current': {
                'Temperature': true, 
                'Clouds': true, 
                'Humidity': true 
            },
            'forecasted': {
                'Wind': true, 
                'Rain': true, 
                'Description': true,
            }
        };
        expectedData = { 
            'current': {
                'Temperature (\u00B0C)': 0,
                'Clouds (%)': 50,
                'Humidity (%)': 100
            },
            'forecasted': {
                'Wind (kn)': [150, 300, 450],
                'Rain (mm)': [200, 350, 500],
                'Description': [250, 400, 550]
            }
        };
    });
    it('Returns an object with all categories and relevant data points included', () => {
        filteredData = filterData(filteredCategories, data, forecastedDays);
        expect(filteredData).toEqual(expectedData);
    });
    it('Returns an object with "false" categories not included', () => {
        filteredCategories.current.Humidity = false;
        filteredCategories.current.Clouds = false;
        filteredCategories.forecasted.Wind = false;
        filteredCategories.forecasted.Rain = false;
        filteredData = filterData(filteredCategories, data, forecastedDays);
        expectedData = { 
            'current': {
                'Temperature (\u00B0C)': 0
            },
            'forecasted': {
                'Description': [250, 400, 550]
            }
        };
        expect(filteredData).toEqual(expectedData);
    });
    it('Returns an object with "forecastedDays" resulting in only one data point for each category in "forecasted" table being included', () => {
        forecastedDays = [0];
        filteredData = filterData(filteredCategories, data, forecastedDays);
        expectedData.forecasted['Wind (kn)'] = [150];
        expectedData.forecasted['Rain (mm)'] = [200];
        expectedData.forecasted['Description'] = [250];
        expect(filteredData).toEqual(expectedData);
    });
});

describe('addCategoryMetric()', () => {
    it('Adds fahrenheit metric to "Temperature" category', () => {
        document.body.innerHTML = '<input id="fahrenheit" name="temp" checked/>';
        expect(addCategoryMetric('Temperature')).toBe('Temperature (\u00B0F)');
    });
    it('Adds celsius metric to "Temperature" category', () => {
        document.body.innerHTML = '<input id="fahrenheit" name="temp"/>';
        expect(addCategoryMetric('Temperature')).toBe('Temperature (\u00B0C)');
    });
    it('Adds (%) metric to "Clouds" category', () => {
        expect(addCategoryMetric('Clouds')).toBe('Clouds (%)');
    });
    it('Adds (%) metric to "Humidity" category', () => {
        expect(addCategoryMetric('Humidity')).toBe('Humidity (%)');
    });
    it('Adds (kn) metric to "Wind" category', () => {
        expect(addCategoryMetric('Wind')).toBe('Wind (kn)');
    });
    it('Adds (mm) metric to "Rain" category', () => {
        expect(addCategoryMetric('Rain')).toBe('Rain (mm)');
    });
    it('No metric added to category', () => {
        expect(addCategoryMetric('Description')).toBe('Description');
    });
});
