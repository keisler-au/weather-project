

function addCategoryMetrics(category) {
    const fahrenheit = document.querySelectorAll('[name=temp]')[1]?.checked,
    metric = category === 'Temperature' && fahrenheit
    ? ' (\u00B0F)'
    : category === 'Temperature'
    ? ' (\u00B0C)'
    : category === 'Clouds' || category === 'Humidity'
    ? ' (%)'
    : category === 'Wind'
    ? ' (kn)'
    : category === 'Rain'
    ? ' (mm)'
    : '';

    return category + metric
};
  
function filterData(
    filteredCategories, 
    data, 
    daysIncluded, 
    tables=['current', 'daily']
    ) {
        let filteredData = { 'current': {}, 'daily': {} };
        tables.forEach(table => {
            for (let category in filteredCategories[table]) {
                const categoryHeader = filteredCategories[table][category];
                if (categoryHeader && categoryHeader !== 'deselect') {
                    const metricCategory = exports.addCategoryMetrics(category);
                    filteredData[table][metricCategory] =
                        table === 'current' 
                        ? data.current[category]
                        : daysIncluded.map(day => data.daily[day][category])
                    
                };
            };
        });

        return filteredData
}; 

// function filterData(filteredCategories, data, daysIncluded=null) {
//     const fahrenheit = document.querySelectorAll('[name=temp]')[1]?.checked,
//     availableData = JSON.stringify(data) !== JSON.stringify(emptyDataTemplate);
//     if (fahrenheit && availableData) {
//         data.current = !daysIncluded && exports.convertTempData(data.current);
//         data.daily = daysIncluded && data.daily.map(dayData => exports.convertTempData(dayData));
//     };
    
//     const categoriesSelected = Object.keys(filteredCategories).filter(category => (
//         filteredCategories[category]
//     )),
//     filteredData = Object.fromEntries(categoriesSelected.map(category => {
//         const categoryData = daysIncluded
//         ? daysIncluded.map(day => data.daily[day][category])
//         : data.current[category];
//         category += exports.addCategoryMetrics(category, fahrenheit);
//         return [category, categoryData]
//     }));
    
//     return filteredData
// }; 

const exports = { 

    addCategoryMetrics,
    filterData 
};
export default exports;
export { 

    addCategoryMetrics,
    filterData 
 };