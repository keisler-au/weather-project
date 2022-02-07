## <a name="filters"></a>Interactive Tables
The 'Current Weather' and '8 Day Forecast' tables can be interacted with by selecting/deselecting the labels (input control elements) in the 'Filters' box. The tables display current or forecasted weather data when a user specifies a location in the 'City' search bar.

<a name="cF"></a>**Category Filters** <br>
Selecting/deslecting category filters adds or removes rows from the associated table. <br>
i.e., Deselecting the 'Temperature' filter from the 'Current Weather' table section removes the 'Temperature' row from the 'Current Weather' table.

<a name="df"></a>**Day Filters** <br>
Selecting/deslecting day filters adds/removes columns from the '8 Day Forecast' table only. <br>
i.e., Deslecting the 'Day 5' filter removes the fith day column from the '8 Day Forecast' table. 

## Common Variables
<a name="fdD"></a>**filteredData** <br>
This object contains the data set that is used to specify the number of rows and columns to generate for each table.
The user selects what data they want displayed in the tables (via [filters](#filters)), and only the selected points of data (retrieved from the [data](#data) object) ends up in filteredData. 

<a name="fdC"></a>**filteredCategories** <br>
This object contains attributes that represent the filter status of each table-category, categories that have been selected (checked) are set to 'true', and deslected set to 'false'. This information goes into determining what categories are initialised into [filteredData](#fdD).

<a name="data"></a>**data** <br>
This object contains all of the current and forecasted weather data for the searched location (if any). It is a stable reference for the dynamically updated [filteredData](#fdD).

<a name="dI"></a>**forecastedDays** <br>
The integers in this array represent each day column in the '8 Day Forecast' table. <br>
i.e., [3, 5, 7] represents 'Day 4', 'Day 6', 'Day 8', respectively. <br>
Selecting a [day filter](#df) adds that corresponding integer to the array (deselecting removes it), with this information determining the point of data initialised into [filteredData](#fdD).

**set\*()** <br>
The 'useState()' and 'useContext()' React hooks are used to make variables accessible to components up and down the tree. All functions that begin with 'set', update the variables state and cause a re-render to occur.

# /controller/
## location-controls.js
**LocationFilter** <br>
Returns a single 'label' node with a 'text input' child. The input allows the user to specify the locale weather data they want to view (i.e., 'City'). The debounce event handler results in an API request ([getWeatherData](#gWD)) when 2000ms has passed from the last typed letter. The weather data retrieved from [getWeatherData](#gWD) is then formatted by [parseData](#pD) and becomes the stable [data](#data) reference. If no weather data is available then an empty formatted data template is initialised instead.

## temperature-controls.js
**Temperatures** <br>
Returns two parent 'label' and child 'radio button input' nodes. The inputs allow the user to determine what measuring unit the temperature data is displayed in (celsius or fahrenheit). The changeTempUnit event handler updates the label node's CSS-related class names depending on their 'checked' status, and convertTempData](#cTD) is called to convert the available weather. The converted data set then gets used in [filteredData](#fdD) to display the updated temperatures in the tables.

## table-filter-controls.js
**TableFilters** <br>
Returns an array of parent 'label' and child 'checkbox input' in nodes. The elements are the [filters](#filters) that allow the user to select or deselect the columns and rows (categories, days, of data) that they want displayed in the tables. The number of nodes in the array is determined by the 'filters' prop, as well as the 'text content' in each label. A filter may be used to select/deselect a single row or column of a given table, or select/deselect all of a tables rows or columns at once. The displayFilters event handler determines what option the user has chosen (select all or single), and updates the label class names to visually represent the filters checked status, as well as pass this information in [filteredData](#fdD) so it can be displayed in the tables accordingly.

# model/
## api-requests.js  
<a name="rA"></a>**requestApi()** <br>
When 'location' (third parameter) is set to 'true', the 'Geocoding API' URL string is chosen and the user-specified 'city' and 'country' locations are added as query string parameters. A promise is then returned from the subesequent fetch call to retrieve the locations geographical data. Alternatively, when the 'location' parameter defaults to 'false', the 'One Call API' URL string is chosen, and the previously retrieved 'longditude' and 'latitude' coordinates are added as query string parameters. A promise is then returned following a call with fetch. <br>
When testing this module, importing api-requests.js into the test file would result in getWeatherData retrieving a reference to the actual requestApi in it's closure, before it could be mocked. Alternatively, requestApi is now being referenced within the scope of a global object ('exports'), which is mocked and then referenced by getWeatherData.

<a name="gWD"></a>**getWeatherData()** <br>
This function is called when a user finishes typing into the 'city', 'country', inputs. Specifying a 'country' location for an API's query string is optional, however specifying a 'city' location is critical. The logic in getWeatherData reflects this, as typing into the 'city' input results in API requests regardless of whether the 'country' input has an entered value or not. Alternatively, typing into the 'country' input only results in API requests if the 'city' input already has an entered value, in which case both the 'city' and 'country' values are used as parameters. Returns a promise on successful fulfillments of requests, otherwise returns null. The 'catch' block logs a specific message if the error caught is 'TypeError', as this indicates that the response from a request did not contain any data, while other types of errors are logged to the console.
## parsing-data.js

<a name="cTD"></a>**convertTempData()** <br>
Accepts a data set (object), and if the 'fahrenheit' radio button is checked the 'Temperature' attribute is converted from degrees celsius to fahrenheit (and vice versa). Returns the converted data set.

<a name="gDS"></a>**getDateString()** <br>
Accepts a unix timestamp and a 'time' parameter. Returns a converted timestamp-to-string of 24 hour timeframe when 'time' parameter is set to 'true', or day and date timeframe when the 'time' parameter defaults 'false'.

<a name="pD"></a>**parseData()** <br>
Accepts an unformatted data set (directly from 'OpenWeather API' request), and unpacks the object inside a 'try block'. The attributes and values are formatted and defined to a new template object. Some of the operation for formatting the values include converting unix timestamps to strings ([getDateString](#gDS)), rounding measurements, and capitalisaing weather text descriptions. The unpacked temperature data is in degrees celsius, so [convertTempData](#cTD) is used to convert the data to fahrenheit if the 'fahrenheit' radio button is checked. Returns the filled object, or a formatted template object without data if an error is caught. If the data set passed into parseData is empty or does not follow the standardised format a TypeError will occur during unpacking and caught by the 'try block', logging a specific message to the console. Other errors will be logged to the console with a generic error message.
## filtering-data.js

<a name="fD"></a>**filter-data()** <br>
Accepts three parameters, [filteredCategories](#fdC), [data](#data), [forecastedDays](#dI). A nested 'for' loop iterates through each category inside the 'current' and 'forecasted' attributes of [filteredCategories](#fdC). If the category is set to 'true', 'addCategoryMetric()' adds respective unit metrics to the category header (string). The 'metricCategory' gets paired with its corresponding data point in [data](#data) and assigned to the [filteredData](#fdData) object. Each category in the '8 Day Forecast' table may be assigned several points of data, representing the days that the user has selected to be displayed in the '8 Day Forecast' table. The data points to include in these categories corresponds to the integers in the [forecastedDays](#dI). Returns a [filteredData](#fdD) object that determines how data is displayed in the tables.

# view/
## table-components.js 
<a name="DH"></a>**DayHeaders** <br>
This component generates the column headers for the '8 Day Forecast' table, with the number of columns being determined by the [forecastedDays](#dI) array.
The [forecastedDays](#dI) array is iterated through and a 'th' node is generated for each integer. The text content for each 'th' node corresponds to the value of the 'Date' attribute in the [data](#data) object. If the 'Date' attribute value is undefined, then the text content becomes 'Day x', with 'x' being the currently iterated integer (plus 1). Returns a 'thead' node containing the array of 'th' nodes.

**CreateRows** <br>
This component is used to generate the rows for each table. The 'tableContent' prop (from [filteredData](#fdD)) is an object with category headings and a corresponding data set. tableContent gets iterated through, with the category heading added as text content to the generated 'th' node, and the dataset added to the generated 'td' node/s. If the data set is an array of data points, then a new 'td' node is generated with each data point. Alternatively, if the data set is just a single item (not an array), then only a single 'td' node is generated. The category headers also determine which rows are added the class name 'time-row' (i.e., 'Date' and 'Time' categories). Returns a 'tbody' node containing the generated 'th' and 'td' node/s.

**Tables** <br>
Returns an array of three table nodes, by using the 'DayHeaders' and 'CreateRows' components. The '8 Day Forecast' table is the only one implementing the [DayHeaders](#DH) component, as it is the only one with more than two columns. 

## app.js 
**App** <br>
Returns all other components.

**FilterFieldsets** <br>
Returns an array of 'fieldset' nodes and React components, improving readability by isolating logic that would otherwise by in 'App'.

**ErrorBoundary** <br>
Renders a custom error message when an error is caught in one of it's child components. 
