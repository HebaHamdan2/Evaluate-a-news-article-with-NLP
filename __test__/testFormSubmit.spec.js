import { handleSubmit } from '../src/client/js/formHandler.js'; 

jest.mock('../src/client/js/formHandler.js', () => ({
  handleSubmit: jest.requireActual('../src/client/js/formHandler.js').handleSubmit
}));

beforeEach(() => {
  jest.clearAllMocks();
  global.Client = {
    checkForArticle: jest.fn(),
    submitArticle: jest.fn(),
    displayRes: jest.fn()
  };
});

describe('handleSubmit function', () => {
  let inputElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="text" type="text" />
        <button type="submit">Submit</button>
      </form>
      <div id="loadingIndicator" style="display:none;"></div>
      <div id="toastContainer"></div>
    `;
    inputElement = document.getElementById('text');
  });

  test('should handle invalid URL', async () => {
    // Mocking behavior for an invalid URL
    Client.checkForArticle.mockReturnValue(false);

    inputElement.value = 'http://invalid.url';

    await handleSubmit({ preventDefault: () => {} });

    expect(Client.submitArticle).not.toHaveBeenCalled();
    expect(Client.displayRes).not.toHaveBeenCalled();
    expect(document.getElementById('loadingIndicator').style.display).toBe('none');
    expect(inputElement.value).toBe('');
  });
});
