import { submitArticle } from '../src/client/js/submitUrl';

// Mock global.fetch before tests run
beforeEach(() => {
  global.fetch = jest.fn();
});

test('catches and logs errors', async () => {
  // Mock fetch to reject with a Network error
  fetch.mockRejectedValueOnce(new Error('Network error'));

  // Mock console.error to track error logs
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  await expect(submitArticle('http://example.com', 'http://server.url')).rejects.toThrow('Network error');
  expect(consoleError).toHaveBeenCalledWith('Error:', new Error('Network error'));

  consoleError.mockRestore();
});
