const serverURL = 'http://localhost:8001/api';

function setupEventListeners() {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        if (process.env.NODE_ENV !== 'test') {
            console.error('Form element with id "urlForm" not found');
        }
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    const formUrl = document.getElementById('text').value; 
    if (Client.checkForArticle(formUrl)) {
        try {
            const result = await Client.submitArticle(formUrl, serverURL);
            Client.displayRes(result);
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting the article.');
        }
    } else {
        alert('Sorry, the URL you entered is not valid.');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
    setupEventListeners();
}

export { handleSubmit };
