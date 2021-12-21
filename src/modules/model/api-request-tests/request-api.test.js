import { enableMocks } from "jest-fetch-mock";

import { requestApi } from "../api-request";


enableMocks();

describe('requestApi()', () => {
    afterEach(() => {
        fetchMock.mockReset();
    });

    it('Returns data retrieved from a fetch() request', async () => {
        fetchMock.mockResponse(JSON.stringify({ 'foo': 'bar' }));
        const requestData = await requestApi('mockUrl');

        expect(requestData).toEqual({ 'foo': 'bar' });
    });

    it('Logs error message when fetch() request fails to retrieve data', async () => {
        fetchMock.mockReject('fooError');
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
        const requestData = await requestApi('mockUrl');
        
        expect(global.console.error).toHaveBeenCalledWith(
            'An Error occured in requestApi:', 
            'fooError'
        )
        expect(requestData).toBeUndefined();
    });
});
