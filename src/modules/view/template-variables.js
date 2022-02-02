const wholeWeek = [0, 1, 2, 3, 4, 5, 6 ,7],
    emptyCategories =  {
        'Temperature': '',  
        'Clouds': '', 
        'Humidity': '', 
        'Wind': '', 
        'Rain': '', 
        'Description': '', 
        'Sunrise': '', 
        'Sunset': '',
        'deselectAll': ''
    },
    emptyDataTemplate = { 
        location: { 
            'Timezone': '' 
        }, 
        current: { 
            'Date': '', 
            'Time': '', 
            ...emptyCategories 
        }, 
        forecasted: wholeWeek.map(() => emptyCategories)
    },
    filterCategories = {
        'Temperature': true,  
        'Clouds': true, 
        'Humidity': true, 
        'Wind': true, 
        'Rain': true, 
        'Description': true, 
        'Sunrise': true, 
        'Sunset': true,
    },
    filterCategoriesTemplate = {
        'current': {
            'Date': true, 
            'Time': true, 
            ...filterCategories
        },
        'forecasted': filterCategories
    };

export {
    wholeWeek, 
    emptyCategories, 
    emptyDataTemplate, 
    filterCategoriesTemplate
};