import { getUrl } from "../api-request";


describe('getUrl()', () => {
  it('Returns url for Geocoding API when "location" parameter set to "true"', () => {
    const locationUrl = getUrl('foo', 'bar', true);
    expect(locationUrl).toBe('http://api.openweathermap.org/geo/1.0/direct?q=foo,bar&appid=410fd56e8e5c7d0fd3399015060b1dd0');
  });

  it('Returns url for One Call Weather API when "location" parameter not defined', () => {
      const weatherUrl = getUrl('foo', 'bar');
      expect(weatherUrl).toBe('https://api.openweathermap.org/data/2.5/onecall?lat=foo&lon=bar&exclude=minutely,alerts&units=metric&appid=410fd56e8e5c7d0fd3399015060b1dd0');
  });
});
