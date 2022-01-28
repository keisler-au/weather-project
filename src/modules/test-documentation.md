# controller/
## "location-controls" module
**"<LocationFilter />" component**
To unit test the "LocationFilter" component the external opertions of "getWeatherData()", "filterData()" and "parseData()" have been mocked out, with each having their own unit tests. The logic being tested is the ouput and the event handler debounce function. Testing the debounce function involves assessing the "setTimeout()" callback function being called only once, and only after 2000ms from the last typed letter. As such it is expected that after typing 'perth' into the input control the "setData()" function located in the callback would not have intially been called. Once the mocked timers have been run, it is expected that only one call to "setData" would have occured, indicating the "setTimeout()" callback was called after the last typed letter.
## "temperature-controls" module
**"<Temperatures />" component**
The unit test for "Temperatures" tests that the component outputs two <label> nodes, with no class names. The "onChange" event and "convertTempData()" function were mocked. As the event gets triggered, the mocked "convertTempData()" is expected to change the "data" variable used by "filteredData()", and the <label> class names ('input-selected', 'input-unselected') are expected to reflect the checked status of the two radio buttons. 
## "table-filter-controls" module
**"<TableFilters />" component**
The first set of unit tests for "TableFilters" involves passing in the "filterOptions" prop and testing that this results in the expected correpsonding output, with the <label>'s text contents matching the items "filterOptions" and the number of controls matching the length of "filterOptions". The second set of unit tests involves testing the logic in "displayFilters()", with "onChange" filter events matching changes in <label> class names and the relevant changes to "filteredData", such that 'deselect all' or 'deselect single' filters are handled correctly with the corresponding filters being changed to/from 'deselected' (false) to 'selected' (true). If the filter is associated with a 'category' then the relevant update should occur in "setFilteredCategories" and will be tested accordingly, alternatively is the filter is associated with a 'day' then the update should occur in "setDaysIncluded".  
# model/
## "api-requests" module 
**"requestApi()" function**
To test "requestApi()" the "jest-fetch-mock" module was used to mocked the "fetch()" call and reduce test latency. The unit test involves mocking a 'fulfilled' or 'rejected' response and testing that the resolved promise matches the expected output. 
**"getWeatherData()" function**
Testing "getWeatherData()" involves testing the conditional logic where "requestApi()" only gets called if 'city' input has a value, otherwise "getWeatherData()" returns null. The catch block is also tested. "requestApi()" was mocked to return undefined or invalid data, the resultant 'TypeError' is expected to be caught and a specific message logged to the console notifying that there was no weather data associated with the specified city. Alternatively, if another error is thrown, a generic error message is expected to be logged, and is tested by mocking "console.error" method. 
Additionally, to test "getWeatherData()", "requestApi()" has been referenced within the scope of the "exports", "imports" variables so that it can be mocked. When importing "api-requests.js" into the test file, "getWeatherData" is retrieving a reference to the actual "requestApi" in it's closure. This means that when mocking "requestApi" in the test file, "getWeatherData" is not referencing and calling the mocked global version, but rather the actual local version within its scope. To make use of the mock, "requestApi" has been declared to a global object (the default export), which is then referenced inside "getWeatherData". Therefore, mocking the global variables "requestApi" is also mocking the same "requestApi" that "getWeatherData" calls.
## "parsing-data" module 
**"convertTempData()" function & "getDateString()" function** 
The "parsing-data" test file contains unit tests for "getDateString" and "convertTempData", where specifying parameters are expected to return converted values (unix timestamp to string, and celsius to/from fahrenheit, respectively). 
**"parseData()" function**
"parseData" is tested with a standardised "data" object object as a parameter, with the expected returned value being a parsed data set, with formatted key:value pairs. The 'try block' is expected to catch and log a specific message for TypeErrors, and is tested by mocking the console.log method and passing an empty object into "parseData" to simulate a non-standardised data set. An empty formatted template is expected to be returned. 
## "filtering-data" module
**"filtering-data()" function**
The output of "filterData()" is expected to be an object that reflects the information provided by the parameters of "filteredCategories" and "daysIncluded". Categories in "filteredCategories" that are set to 'false' are not expected to show up in the returned object, and the number of days specified in "daysIncluded" is expcted to be represented by the number of data points in the array of each 'daily' table category. Each data point included in the return object is retrieved from the "data" variable. Each category key added to the returned object is expected to be ammended to include additional unit metric information as implemented through "addCategoryMetric()". "addCategoryMetric" has it's own unit test as well as being tested through the "filterData" unit tests for to cover all pathways and provide more specificity in test results. 
# view/
## "day-headers" module 
**"<DayHeaders />" component**
The "day-headers" test file has three tests. 
For the "DayHeaders" component it is expected that the number of generated <th> nodes corresponds to the number of integers in "daysIncluded". The text content of each <th> node is also expected to correspond to the "daysIncluded" integers, such as 'Day (integer +1)' if the "Date" attribute in the "data.daily" object is empty. Otherwise, the <th> node is expected to display the value stored in the "Date" attribute.
## "create-rows" module 
**"<CreateRows />" component**
"CreateRows" is expected to return either multiple or a single <td> node depending on the amount of data points stored in 'data' in the "tableContent" prop. It is also expected that rows containing a text content of 'Date' or 'Time' are assigned the className of 'time-row'.
## "tables" module 
**"<Tables />" component**
The "Tables" component is expected to render three <label> and <table> nodes with respective child nodes corresponding to "data.location" and the "filteredData" variables. A mocked 'click' event is expected to change the text content of the <label> node and the class name of the <table> node.
## "app" module
**"<App />" component"**
"App" is currently in the process of being integration tested using the 'Cypress' framework. This testing suite would assess whether user interactions and the resulting communication between components are behaving as expected. 
