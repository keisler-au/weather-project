import fDImports, { convertTempData, filterData } from "./FilteringData";


describe('addCategoryMetric()', () => {
    it('Adds fahrenheit metric to "Temperature" category', () => {

    });
    it('Adds celsius metric to "Temperature" category', () => {

    });
    it('Adds (%) metric to "Clouds" category', () => {

    });
    it('Adds (%) metric to "Humidity" category', () => {

    });
    it('Adds (kn) metric to "Wind" category', () => {

    });
    it('Adds (mm) metric to "Rain" category', () => {

    });
    it('No metric added to category', () => {

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

    // it('Calls convertTempData dependancy', () => {
    //     filterData(headerStatus, data);
    //     expect(fDImports.convertTempData).not.toHaveBeenCalled();

    //     headerStatus = { ...headerStatus, 'tempUnit': 'Fahrenheit'};
    //     filterData(headerStatus, data);
    //     expect(fDImports.convertTempData).toHaveBeenCalled();
    //     headerStatus = { ...headerStatus, 'tempUnit': 'Celsius'};
    // });

    it('Returns "filteredData" object with its content based on status of categories in "filteredCategories"', () => {
        let filteredData = filterData(headerStatus, data);
        expect(filteredData).toEqual(expectedData);

        headerStatus = { ...headerStatus, 'Rain': true };
        filteredData = filterData(headerStatus, data);
        expectedData = { ...expectedData, 'Rain': 100 + 'mm' };
        expect(filteredData).toEqual(expectedData);
    });

    // it('Returns "data", an array of objects whose keys are based on status of keys in "headerStatus"', () => {
    //     const daysIncluded = [0, 1, 2];
    //     data = Array.from(daysIncluded, () => data);

    //     let filteredData = filterData(headerStatus, data, daysIncluded);
    //     expectedData = Array.from(daysIncluded, () => expectedData);
    //     expect(filteredData).toEqual(expectedData);

    //     headerStatus = {...headerStatus, 'Rain': false };
    //     filteredData = filterData(headerStatus, data, daysIncluded);
    //     expectedData = Array.from(daysIncluded, () => { 
    //         return { 'Temperature': 0 + ' \u00B0C', 'Clouds': 50 + '%' }
    //     });
    //     expect(filteredData).toEqual(expectedData);
    // });
});
