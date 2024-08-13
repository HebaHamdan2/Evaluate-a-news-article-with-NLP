import { displayRes } from '../src/client/js/displayResult';

describe('displayRes', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="sentimentResult"></div>';
  });

  test('displays error message when data contains error', () => {
    const errorData = { error: 'Invalid URL' };
    displayRes(errorData);
    const resultElement = document.getElementById('sentimentResult');
    expect(resultElement.innerHTML).toBe('<p>Invalid URL</p>');
  });

  test('displays formatted result when data is valid', () => {
    const validData = { result: 'success' };
    displayRes(validData);
    const resultElement = document.getElementById('sentimentResult');
    expect(resultElement.innerHTML).toBe('<pre>{\n  "result": "success"\n}</pre>');
  });
});
