import { checkForArticle } from '../src/client/js/articleChecker';

describe('checkForArticle', () => {
  test('returns true for valid http URL', () => {
    expect(checkForArticle('http://example.com')).toBe(true);
  });

  test('returns true for valid https URL', () => {
    expect(checkForArticle('https://example.com')).toBe(true);
  });

  test('returns true for valid ftp URL', () => {
    expect(checkForArticle('ftp://example.com')).toBe(true);
  });

  test('returns false for URL without scheme', () => {
    expect(checkForArticle('example.com')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(checkForArticle('')).toBe(false);
  });

  test('returns false for null', () => {
    expect(checkForArticle(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(checkForArticle(undefined)).toBe(false);
  });
});
