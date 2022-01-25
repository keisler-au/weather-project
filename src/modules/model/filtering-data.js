export function addCategoryMetric(category) {
    const fahrenheit = document.getElementById('fahrenheit')?.checked,
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

export function filterData(filteredCategories, data, daysIncluded) {
    let filteredData = { 
        'current': {}, 
        'daily': {} 
    };
    for (const table in filteredCategories) {
        for (const category in filteredCategories[table]) {
            if (filteredCategories[table][category]) {
                const metricCategory = addCategoryMetric(category);
                filteredData[table][metricCategory] = 
                    table === 'current' 
                    ? data.current[category]
                    : daysIncluded.map(day => data.daily[day][category])
            };
        };
    };

    return filteredData
}; 