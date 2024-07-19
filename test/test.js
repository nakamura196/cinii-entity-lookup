import fetchMock from 'fetch-mock';
import jps from '../src/index.js';

fetchMock.config.overwriteRoutes = false;

const queryString = '五箇庄';

jest.useFakeTimers();

test('lookup builders', () => {
  [
    'findRS',
  ].forEach(async (uriBuilderMethod) => {
    const results = await jps[uriBuilderMethod](queryString);
    expect(results.length > 0).toBe(true);
  });
});
