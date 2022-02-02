# Welcome to the 'Weather Project'! 
The 'Weather Project' is an application I have designed to showcase some of the skills I have developed in key areas like HTML, CSS, and JavaScript. The application allows a user to search and retrieve a specified location's weather data, as well as interact with how that information is displayed on screen. 
This project is a continued effort to learn and improve, so any and all feedback you may have would be greatly appreciated!

Table of Contents|
-|
[Steps to running the application and tests](#run)|
[How to interact with the application](#interact)|
[App documentation](#docs)|
[Technologies used](#tools)|
[Developing the application](#build)|
[Future intentions](#future)|
[About me](#author)|

## <a name="run"></a>Steps to running the application and tests: 	
1. Clone the repository into a local file
2. Install the dependencies > *npm install*
3. Run the application on a local host > *npm start*
4. Run the application tests > *npm test*

## <a name="interact"></a>How to interact with the application:
**Search bars** <br>
There are two search bars that allow a user to specify a location and retrieve weather data. To retrieve weather data the user is required to type into the 'City' search bar, while input in the 'Country' search bar is optional and allows for greater specificity. Both search bars automatically submit input after a 2 second wait from the last key press and do no require the user to enter or submit their input.

**Filters** <br>
Clicking on the 'Filter' tab displays the filters that the user can use to interact with the tables below. A grey coloured box is a button that is currently selected (on), and a white box is a deselected buttons (off). For example, clicking on a category item in the '"Current Weather" Categories' section selects or deselects that category from the 'Current Weather' table. Likewise, clicking on a day item in the '"8 Day Forecast" Days' section selects or deselects that day from the '8 Day Forecast' table. Finally, selecting the small button to the top left of each section selects or deselects all of the items for that section.

![all categories selected](./assets/all-selected.png "All categories selected")|![single category deselected](./assets/single-deselected.png "Single category deselected")|![all categories deselected](./assets/all-deselected.png "All categories deselected")
-|-|-

**Tables** <br>
Weather data is displayed in all three tables once a user enters an input into the 'City' search bar. However, if the user's input is invalid (i.e., there is no matching location in the database), then no content in the tables are displayed. 

**Responsive layout** <br>
All the elements displayed respond proportionately to the browser window being shortened and widened.

## <a name="docs"></a>App documentation:
* [Module Documentation](./src/modules/module-documentation.md)
* [Test Documentation](./src/modules/test-documentation.md)

## <a name="tools"></a>Technologies used:
**React** - Contains both the logic and HTML implementation of the application.
**Jest** - Used to unit test the logic within the various functions and components.
**ESLint** - Used to format syntax into common conventions. 
**SASS** - Used to write more clean, DRY, reusable CSS.

## <a name="build"></a>Developing the application:
**What I learnt** 
I learnt a lot about JavaScript and React in developing this program. The 'debounce' implementation, and testing locally scoped functions, gave me the opportunity to gain a more comprehensive understanding of closures. Building the project with React allowed me to learn more about functional components and how to use React Hooks. Consistently refactoring my code also enabled me to explore some formatting conventions and discover more concise syntax shortcuts.

**What I found difficult**
I found the planning and testing phases particularly challenging. I had intended to follow a Test Driven Development (TDD) approach, where I would write the test first and the actual component second. However, maybe due to my inexperience with the technologies I wasn't able to configure a clear outline for most features of the application, or how to build them in a progressive way. As I didn't know what components to build I wasn't able to follow a TDD process, which I think resulted in a more time consuming and intensive development build period.

**What I would improve next time**
Next time when working with the same technologies I would like to have a more strategic foundation when building logic and features. One way I could do this is to follow the Model, View, Controller design more thoroughly.

## <a name="future"></a>Future intentions:
**Integration testing**
Integration testing using the 'Cypress' framework is currently in developement to test that each user interaction causes the program to behave in the expected way.

**Design**
The 'Filter' feature which can be disorientating to the user when element positioning drops in and out. A tab bar feature that contains a tab for each table could make the display more slim line and easier for the user to focus on only one element at a time. This would also feed into the filters where each section could be isolate towards its table and not all lumped together. 

**Sort feature**
Another feature to add to the program is a sorting function where the table data could be sorted by ascending or descending values.

## <a name="author"></a>About me:
[Josh Keisler | LinkedIn](https://www.linkedin.com/in/josh-keisler-93b070a1/)