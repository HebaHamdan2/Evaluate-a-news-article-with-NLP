// jest.setup.js
global.Client = {
    checkForArticle: jest.fn(),
    submitArticle: jest.fn(),
    displayRes: jest.fn(),
    handleSubmit: jest.fn()
};
