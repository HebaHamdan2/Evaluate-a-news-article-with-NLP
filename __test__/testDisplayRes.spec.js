import { displayRes } from '../src/client/js/displayResult.js';

describe('displayRes function', () => {
  let resultElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="sentimentResult"></div>
    `;
    resultElement = document.getElementById('sentimentResult');
  });

  test('should display the correct sentiment results', () => {
    const polarity = 'P';
    const agreement = 'High';
    const subjectivity = 'Subjective';
    const confidence = '85';
    const irony = 'None';

    displayRes(polarity, agreement, subjectivity, confidence, irony);

    const boxes = resultElement.getElementsByClassName('result-box');
    expect(boxes[0].textContent).toContain('Positive POLARITY');
    expect(boxes[1].textContent).toContain('High');
    expect(boxes[2].textContent).toContain('Subjective');
    expect(boxes[3].textContent).toContain('85% CONFIDENCE');
    expect(boxes[4].textContent).toContain('None');
  });

  test('should handle missing values', () => {
    const polarity = 'NONE';
    const agreement = '';
    const subjectivity = '';
    const confidence = '';
    const irony = '';

    displayRes(polarity, agreement, subjectivity, confidence, irony);

    const boxes = resultElement.getElementsByClassName('result-box');

    expect(boxes[0].textContent).toBe('Without POLARITY');
    expect(boxes[1].textContent).toBe('');
    expect(boxes[2].textContent).toBe('');
    expect(boxes[3].textContent).toBe('% CONFIDENCE');
    expect(boxes[4].textContent).toBe('');
  });
});