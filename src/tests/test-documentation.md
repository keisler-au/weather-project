# controller/
## location-controls.js
**LocationFilter** <br>
Expected output is a 'label' and 'input' node, with the text content and 'id' attribute being assigned the value of the 'location' prop. <br>
Expected logic implementation after mocked 'onChange' event is for the event handler debounce function to call the 'setTimeout()' callback function only once, 2000ms from after the last typed letter. It is expected that after mock typing 'perth' into the input control the 'setData()' function located in the callback would not have intially been called. Once the mocked timers have been run, it is expected that only one call to setData() would have occured, indicating the setTimeout() callback was called after the last typed letter ('h'). <br>
The imported functions of 'getWeatherData()', 'filterData()', and 'parseData()' have been mocked out to isolate the logic within 'LocationFilter'. 

## temperature-controls.js
**Temperatures** <br>
Expected output is two 'label' nodes with no assigned class names. 
Expected logic implementation after mocked 'onChange' event is for the mocked imported 'convertTempData()' function to change the [data](../modules/module-documentation.md/#data) variable that is passed into [filterData](../modules/module-documentation.md/#fD). <br>
The label class names ('input-selected', 'input-unselected') are also expected to reflect the checked status of the two radio buttons upon mocked event.

## table-filter-controls.js
**TableFilters** <br>
Expected output is for the number of 'label' nodes generated, and their text contents, correspond to the information initialised into the 'filters' prop. <br>
Expected logic implementation after mocked 'onChange' event is for selected or deselected [filters](../modules/module-documentation.md/#filters) to result in a corresponding change to either the [filteredCategories](../modules/module-documentation.md/#fdC) or [forecastedDays](../modules/module-documentation.md/#fdC) variables, passed into 'setFilteredCategories()' and 'setForecastedDays()' respectively. Changing a filter's (input's) checked status is also expected to change the parent 'label' nodes class name. 

# model/
## api-requests.js 
**requestApi()** <br>
Expected output is either a promise for a mocked fetch fulfilled response, or a specific error message to be logged to console when a rejected fetch response is mocked.

**getWeatherData()** <br>
Expected output is either a promise when the 'city' text 'input' node has a value and the mocked [requestApi](../modules/module-documentation.md/#rA) returns a fulfilled response, or 'null'. <br>
Expected logic implementation after the mocked [requestApi](../modules/module-documentation.md/#rA) throws an error is for 'TypeError' to be caught inside the 'catch' block and a specific message logged to the mocked console, otherwise a generic error message is expected to be logged.

## parsing-data.js 
**convertTempData()** <br>
Expected output is a data set with 'Temperature' attribute values being converted from degrees celsius to fahrenheit, and vice versa.

**getDateString()** <br>
Expected output is either a unix timestamp string representation of its time when the second parameter 'time' is set to 'true'. or a string representation of its date when the 'time' parameter defaults to 'false'.

**parseData()** <br>
Expected output when a valid data set is passed in as a parameter, is an object with formatted key:value pairs that corresponding to data points in the [data](../modules/module-documentation.md/#data) parameter. Expected output when an invalid data set is passed in as a parameter, is an empty formatted object, and for the 'try' block to catch a 'TypeError' and log a specific message to the mocked console. 

## filtering-data.js
**filtering-data()** <br>
Expected ouput is a formatted object with key:value pairs determined by the passed in parameters; keys align with the categories (attributes) that are set to 'true' in [filteredCategories](../modules/module-documentation.md/#fdC), values correspond with the category data points in [data](../modules/module-documentation.md/#data), and the number of data points for each category in '8 Day Forecast' table represented by the integers in [forecastedDays](../modules/module-documentation.md/#dI). Each object key is expected to be formatted according to the implementation of 'addCategoryMetric()'. addCategoryMetric() has it's own unit test as well to cover all pathways and provide more specificity in test results. 

# view/
## day-headers.js 
**DayHeaders** <br>
Expected output is a 'thead' node containing an array of 'th' nodes, and for the number of 'th' nodes in the array to correspond to the number of integers in [forecastedDays](../modules/module-documentation.md/#dI). Expected text content for each 'th' node is either the value of the 'Date' attribute in the [data](../modules/module-documentation.md/#data) object, or when the value is undefined for the text content to be 'Day x', with 'x' being a corresponding integer in [forecastedDays](../modules/module-documentation.md/#dI) (plus 1).

## create-rows.js 
**CreateRows** <br>
Expected output is a 'tbody' node, with multiple 'td' child nodes when there are multiple data points in the 'tableContent' prop (initialised into an array), or a single 'td' node when there is only one data point in the 'tableContent' prop. <br>
Expected logic implementation is for 'tr' nodes with text content of 'Date' or 'Time' to also be assigned a class name of 'time-row'. 

## tables.js 
**Tables** <br>
Expected output is three 'table' nodes, with the data displayed in each table (child node) corresponding to the data initialised in [data.location](../modules/module-documentation.md/#data), [filteredData.current](../modules/module-documentation.md/#fdD), and [filteredData.daily](../modules/module-documentation.md/#fdD).

## app.js
**App** <br>
App is currently in the process of being integration tested using the 'Cypress' framework. This testing suite would assess whether user interactions and the resulting communication between components are behaving as expected. 