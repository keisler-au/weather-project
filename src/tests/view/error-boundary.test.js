import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';

import { ErrorBoundary } from '../../modules/view/app';


let container = document.createElement('div');
document.body.appendChild(container);

describe('<ErrorBoundary />', () => {
    it('Displays error message on error generated by child', () => {
        let errorRender;
        act(() =>  {
            errorRender = render(
                <ErrorBoundary > 
                    <div>No error</div>
                </ErrorBoundary >,
                container
            );
        });

        let expectedHtml = '<div>No error</div>';
        expect(container.innerHTML).toBe(expectedHtml);
    
        errorRender.setState({ 'hasError': true });
        expectedHtml = '<h1>An error has occured</h1>';
        expect(container.innerHTML).toBe(expectedHtml);
    });
});
