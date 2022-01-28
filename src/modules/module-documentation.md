# <a name="filters"></a>Interactive Tables
The two tables that the user can interactive with are the 'Current Weather' and '8 Day Forecast' tables.
<br> **Current Weather table** <br>
Displays immediate weather data at the time it was retrieved following the user specifying a location in the 'City' search bar
<br> **8 Day Forecast table** <br>
Displays the forecasted weather data for the current day and the proceding week.
<br> <a name="cF"></a>**Category filters** <br>
Selecting/deslecting category filters adds/removes rows from the respective tables. <br>
i.e., Deselecting the 'Temperature' filter from the 'Current Weather' table section removes the 'Temperature' row from the 'Current Weather' table. 
<br> <a name="df"></a>**Day filters** <br>
Selecting/deslecting day filters adds/removes columns from the '8 Day Forecast' table only. <br>
i.e., Deslecting the 'Day 5' filter removes the fith day column from the '8 Day Forecast' table. 
# Variables
## <a name="fdD"></a>filteredData
Object that contains the data set that is used to specify the number of rows and columns as the tables are being generated.
The user selects what data they want displayed in the tables (via [filters](#filters)), and only the selected points of data (corresponding to the [data](#data) object) ends up in the filteredData object. 
## <a name="fdC"></a>filteredCategories
An object that contains attributes representing the categories for each table, with values set to 'true' or 'false' depending on their corresponding 'checked' status. <br>
Selecting a [category filter](#cF) changes the corresponding attribute in filteredCategories to 'true' (deselecting to 'false'). <br>
This object is then used for [filterData](#fd), [filteredData](#fdD), to determine what categories will be displayed in each table. 
## <a name="data"></a>data
An empty or filled formatted object that contains all of the current and forecasted weather data of the searched location (if any). <br>
Used as a reference for the dynamically updated [filteredData](#fdD) variable.
## <a name="dI"></a>daysIncluded
An array containing integers ranging from zero to seven, or no integers at all. Each integer represents a specific day in the eight day forecast week <br>
i.e., [3, 5, 7] represents 'Day 4', 'Day 6', 'Day 8', respectively. <br>
Selecting a [day filter](#df) adds the corresponding day to the array (deselecting removes it). 
This array is then used for [filterData](#fd), [filteredData](#fdD), to determine what days will be displayed in the '8 Day Forecast' table. 
## set*()
The 'useState()' and 'useContext()' React hooks are used to make variables accessible to components up and down the tree. All functions that being with 'set' update the variables state and cause a re-render to occur.


# controller/
## location-controls.js
**LocationFilter** <br>
Returns two 'label' nodes with a text 'input' node in each label. The inputs allow the user to specify what 'City' and 'Country' locations they want weather data for. The inputs have an 'onChange' debounce event handler (textDebounce), where 2000ms after the last typed letter [getWeatherData](#gWD) will be called from inside 'setTimeout()'s callback function. <br> 
The weather data (if any) retrieved from [getWeatherData](#gWD) is then formatted by calling [parseData](#pD) and stored in the 'parsedData' variable. If no data is available then an empty formatted data template is initialised to parsedData instead. <br>
The parsedData variable is passed as an argument in [filterData](#fD) to initialise the [filteredData](#fdD) variable.
## temperature-controls.js
**Temperatures** <br>
Returns two 'label' nodes with a radio button 'input' node in each label. The inputs allow the user to determine what measuring unit the temperature data is displayed in (celsius or fahrenheit). <br>
The inputs have an 'onChange' event handler (changeTempUnit), which first updates the label nodes CSS-related class names depending on their 'checked' status. Then if there is data available to be converted (by a user searching for location), the [convertTempData](#cTD) function is called. <br>
The updated dataset is passed as an argument in [filterData](#fD) to initialise the [filteredData](#fdD) variable.
## table-filter-controls.js
**TableFilters** <br>
Returns an array of 'label' nodes with a checkbox 'input' in each label. The 'filterOptions' prop passed in to the component determines how many labels end up in the array, and what each label's text content is. The inputs are the [filters](#filters) that allow the user to select or deselect the columns and rows (categories of data) that they want displayed in the tables. <br>
The inputs have an 'onChange' event handler (displayFilters), which changes the inputs parent node (label) class name to visually represent the filters changed status and updates the [filteredData](#fdD) variable. <br> 
A filter may represent either a row or a column of a given table, and the user can choose to select/deselect a single filter, or select/deselect all of a tables filters (rows or columns) at once (see [Interactive Tables](#filters)).
The logic in displayFilters() determines what option the user has chosen and updates label class names and the [filteredData](#fdD) variable accordingly.
# model/
## api-requests.js  
**requestApi()** <br>
Accepts three parameters. <br>
When the third parameter 'location' is set to 'true', the 'Geocoding API' URL string and the user-specified 'city' and 'country' locations are added into the string. <br>
Returns a promise from the subesequent 'fetch()' that is called with the chosen URL to request location data for the specified parameters. <br>
When the 'location' parameter defaults to 'false', the 'One Call API' URL string is chosen, and the previously retrieved 'longditude' and 'latitude' location coordinates are added into the string. <br>
Returns a promise of the fetch() response.
<br> <a name="gWD"></a>**getWeatherData()** <br>
getWeatherData() is called when a user finishes typing a value into the 'city', 'country', text inputs. If the user types into the 'city' input, the proceeding chaing of API requests are made regardless of whether the 'country' input has an entered value or not. Alternatively, if the user types into the 'country' input, an API request is only made if the 'city' input already has an entered value, in which case both the 'city' and 'country' values are used as parameters. This logic reflects how the 'country' parameter in the API request is optional  (providing more specificity on the user's desired location) while the 'city' parameter is critical. <br>
A 'catch' block logs a specific message if the error caught is 'TypeError', as this indicates that the response from a request did not contain any data. Any other type of error is logged to the console. <br>
Returns a promise on successful fulfillment of the request, otherwise returns null. 
## parsing-data.js
<br> <a name="cTD"></a>**convertTempData()** <br>
Accepts the 'data' object. The value for the 'Temperature' attribute is converted from degrees celsius to fahrenheit if the 'fahrenheit' radio button is checked (or vice versa). <br>
Returns the updated 'data' object.
<br> <a name="gDS"></a>**getDateString()** <br>
Accepts a unix timestamp and a 'time' parameter. <br>
Returns a string of the timestamps 24 hour timeframe when the 'time' parameter is set to 'true'. <br>
Returns a string of the timestamps day and date timeframe when the 'time' parameter defaults to 'false'.
<br> <a name="pD"></a>**parseData()** <br>
Accepts a 'data' object (the response from the 'OpenWeather API' request). <br>
The object gets unpacked for the relevant values inside a 'try block', and are then formatted and defined to a new template object 'parsedData'. <br>
Some of the values that are formatted include; converting unix timestamps to strings ([getDateString](#gDS)), rounding measurements, and capitalisaing weather text descriptions. <br>
The unpacked temperature data will be in degrees celsius, so if the 'fahrenheit' radio button is checked, [convertTempData](#cTD) is used to convert the data to fahrenheit. <br>
A TypeError occuring due to unpacking the object will be caught by the 'try block', with a specific message is logged to the console. This is likely to occur when the 'data' object passed into 'parseData' is empty or if does not follow the standardised format. Otherwise all other errors will be logged to the console with a generic error message. <br>
Returns a formatted template object with data, or a formatted template object without data if an error is caught.
## filtering-data.js
<a name="fD"></a>**filter-data()** <br>
Accepts three parameters, [filteredCategories](#fdC), [data](#data), [daysIncluded](#dI).
A nested 'for' loop iterates through each category inside the 'current' and 'daily' attributes of [filteredCategories](#fdC). If the category is set to 'true', 'addCategoryMetric()' adds respective unit metrics to the category header (string). <br>
The 'metricCategory' gets paired with its corresponding data point in [data](#data) and assigned to the [filteredData](#fdData) object. <br>
Each category in the 'daily' table may be assigned several points of data, representing the days that the user has selected to be displayed in the '8 Day Forecast' table. The data points to include in these categories corresponds to the integers in the [daysIncluded](#dI). <br>
Returns a [filteredData](#fdD) object.
# view/
## all-table-components.js 
This module contains the React components that are used to generate the tables.
<br> <a name="DH"></a>**DayHeaders** <br>
This component generates the column headers for the '8 Day Forecast' table, with the number of columns being determined by the [daysIncluded](#dI) array.
The [daysIncluded](#dI) array is iterated through and a 'th' node is generated for each integer. The text content for each 'th' node corresponds to the 'Date' attribute in the [data](#data) object. If there is no data stored in the 'Date' attribute, then the text content becomes 'Day x', with 'x' being the currently iterated integer plus 1. <br>
Returns a 'thead' node containing the array of 'th' nodes.
<br> **CreateRows** <br>
This component is used to generate the rows for each table.
Accepts a 'tableContent' prop (derived from [filteredData](#fdD)) that gets iterated through, with 'td' node/s being generated and their text content containing that iterations information. If the information is an array of data points, then a 'td' node is generated for each data point. Alternatively, if the information is not in an array, then only a single 'td' node is generated. <br>
The categories in 'tableContent' also determine which rows are added class names of 'time-row' (i.e., 'Date' and 'Time' categories). <br>
Returns a 'tbody' node containing the 'th' and 'td' node/s. 
<br> **Tables** <br>
Returns an array of three table nodes, by using the 'DayHeaders' and 'CreateRows' components. <br>
Each table has an associated 'label' node with an input checkbox inside. Each input has an 'onChange' event handler (tableFilterButtons), that changes the icon inside the 'label' node (via text content) and hides the table when it is checked (via class names). 
Only the '8 Day Forecast' table is expected to have more than two columns ([DayHeaders](#DH)) and a 'tfoot' node.  
## app.js 
**App** <br>
Returns all other components.
<br> **FilterFieldsets** <br>
Returns an array of 'div' nodes and React components, improving readability by isolating logic that would otherwise by in 'App'.
<br> **ErrorBoundary** <br>
Renders a custom error message when an error is caught in one of it's child components. 

