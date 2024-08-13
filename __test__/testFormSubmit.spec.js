// Import the necessary modules
import { handleSubmit } from '../src/client/js/formHandler';
import { checkForArticle } from '../src/client/js/articleChecker';
import { submitArticle } from '../src/client/js/submitUrl';
import { displayRes } from '../src/client/js/displayResult';

// Mock the modules
jest.mock('../src/client/js/articleChecker', () => ({
  checkForArticle: jest.fn()
}));
jest.mock('../src/client/js/submitUrl', () => ({
  submitArticle: jest.fn()
}));
jest.mock('../src/client/js/displayResult', () => ({
  displayRes: jest.fn()
}));

describe('Testing the submit functionality', () => {
  // Set up the DOM and mocks before each test
  beforeEach(() => {
    // Create and append a form to the document body
    document.body.innerHTML = `
      <form id="urlForm">
        <input type="text" id="text" value="http://example.com" />
        <button type="submit">Submit</button>
      </form>
    `;

    // Reset mock implementations before each test
    jest.resetAllMocks();
  });

  test('handleSubmit should prevent default and call submitArticle', async () => {
    // Define the mock implementations
    checkForArticle.mockReturnValue(true); // Simulate a valid URL
    submitArticle.mockResolvedValue('result'); // Simulate a successful API response

    // Create a mock event
    const event = { preventDefault: jest.fn() };

    // Call handleSubmit
    await handleSubmit(event);

    // Verify that preventDefault was called
    expect(event.preventDefault).toHaveBeenCalled();

    // Verify that checkForArticle was called with the correct URL
    expect(checkForArticle).toHaveBeenCalledWith('http://example.com');

    // Verify that submitArticle was called with the correct parameters
    expect(submitArticle).toHaveBeenCalledWith('http://example.com', 'http://localhost:8001/api');

    // Verify that displayRes was called with the result
    expect(displayRes).toHaveBeenCalledWith('result');
  });

  test('handleSubmit should handle errors and call console.error', async () => {
    // Define the mock implementations
    checkForArticle.mockReturnValue(true); // Simulate a valid URL
    submitArticle.mockRejectedValue(new Error('Submission error')); // Simulate an API error

    // Mock console.error
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Create a mock event
    const event = { preventDefault: jest.fn() };

    // Call handleSubmit
    await handleSubmit(event);

    // Verify that preventDefault was called
    expect(event.preventDefault).toHaveBeenCalled();

    // Verify that checkForArticle was called with the correct URL
    expect(checkForArticle).toHaveBeenCalledWith('http://example.com');

    // Verify that submitArticle was called with the correct parameters
    expect(submitArticle).toHaveBeenCalledWith('http://example.com', 'http://localhost:8001/api');

    // Verify that console.error was called with the expected error message
    expect(consoleError).toHaveBeenCalledWith('Submission error:', expect.any(Error));

    // Restore console.error
    consoleError.mockRestore();
  });

  test('handleSubmit should alert if URL is invalid', async () => {
    // Define the mock implementations
    checkForArticle.mockReturnValue(false); // Simulate an invalid URL

    // Mock alert
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Create a mock event
    const event = { preventDefault: jest.fn() };

    // Call handleSubmit
    await handleSubmit(event);

    // Verify that preventDefault was called
    expect(event.preventDefault).toHaveBeenCalled();

    // Verify that checkForArticle was called with the correct URL
    expect(checkForArticle).toHaveBeenCalledWith('http://example.com');

    // Verify that alert was called with the expected message
    expect(alert).toHaveBeenCalledWith('Sorry, the URL you entered is not valid.');

    // Restore alert
    alert.mockRestore();
  });
});
