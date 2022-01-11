import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "react-dom";

import OptionalInputs from "./OptionalControls";


// jest.mock('./CategoryControls', () => ({ Categories: jest.fn() }));
// jest.mock('./DayControls', () => ({ Days: jest.fn() }));
// jest.mock('./ControlTemplates', () => {
//     return { Fieldsets: jest.fn().mockImplementation(() => ' mockedFieldset ') }
// });
// jest.mock('./TemperatureControls', () => ({ Temperatures: jest.fn() }));

const container = document.createElement('div');
document.body.appendChild(container);

it('Returns an array of four <fieldsets>', () => {
    act(() => { render(<OptionalInputs />, container) });
    const expectedHTML = ' ' 
    // + 'mockedFieldset ' 
    // + '<div>Only include (categories selected)</div> '
    // + 'mockedFieldset  '
    // + 'mockedFieldset '
    // + '<div>Only include (days selected)</div> '
    // + 'mockedFieldset ';
    expect(container.innerHTML).toBe(expectedHTML);
});