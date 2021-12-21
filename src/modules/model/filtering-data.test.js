import fDImports, { convertTempData, filterData } from "./FilteringData";


describe('convertTempData()', () => {
    it('converts celsius temperature to fahhrenheit', () => {
        const celsius = 0 + ' \u00B0C',
        fahrenheit = 32 + ' \u00B0F',
        data = { 'Temperature': celsius },
        convertedData = convertTempData(data),
        expectedData = { 'Temperature': fahrenheit };
        expect(convertedData).toEqual(expectedData);
    });
});

describe('filterData()', () => {
    let headerStatus = { 
        'tempUnit': 'Celsius',
        'Temperature': true, 
        'Clouds': true, 
        'Rain': false 
    },
    data = { 
        'Temperature': 0 + ' \u00B0C',
        'Clouds': 50 + '%',
        'Rain': 100 + 'mm'
    },
    expectedData = { 
        'Temperature': 0 + ' \u00B0C',
        'Clouds': 50 + '%',
     };

    fDImports.convertTempData = jest.fn().mockImplementation(() => data);

    it('Calls convertTempData dependancy', () => {
        filterData(headerStatus, data);
        expect(fDImports.convertTempData).not.toHaveBeenCalled();

        headerStatus = { ...headerStatus, 'tempUnit': 'Fahrenheit'};
        filterData(headerStatus, data);
        expect(fDImports.convertTempData).toHaveBeenCalled();
        headerStatus = { ...headerStatus, 'tempUnit': 'Celsius'};
    });

    it('Returns a "data" object with keys based on status of keys in "headerStatus"', () => {
        let filteredData = filterData(headerStatus, data);
        expect(filteredData).toEqual(expectedData);

        headerStatus = { ...headerStatus, 'Rain': true };
        filteredData = filterData(headerStatus, data);
        expectedData = { ...expectedData, 'Rain': 100 + 'mm' };
        expect(filteredData).toEqual(expectedData);
    });

    it('Returns "data", an array of objects whose keys are based on status of keys in "headerStatus"', () => {
        const daysIncluded = [0, 1, 2];
        data = Array.from(daysIncluded, () => data);

        let filteredData = filterData(headerStatus, data, daysIncluded);
        expectedData = Array.from(daysIncluded, () => expectedData);
        expect(filteredData).toEqual(expectedData);

        headerStatus = {...headerStatus, 'Rain': false };
        filteredData = filterData(headerStatus, data, daysIncluded);
        expectedData = Array.from(daysIncluded, () => { 
            return { 'Temperature': 0 + ' \u00B0C', 'Clouds': 50 + '%' }
        });
        expect(filteredData).toEqual(expectedData);
    });
});
