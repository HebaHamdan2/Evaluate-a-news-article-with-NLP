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

function showLoading() {
    document.getElementById('loadingIndicator').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingIndicator').style.display = 'none';
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500); // Remove toast element after fade-out
    }, 3000);
}

async function handleSubmit(event) {
    event.preventDefault();
    const inputElement = document.getElementById('text');
    const formUrl = inputElement.value; 
    if (Client.checkForArticle(formUrl)) {
        try {
            showLoading();
            let result = await Client.submitArticle(formUrl, serverURL);
            let Polarity = result.score_tag; 
            let { agreement, subjectivity, confidence, irony } = result;
            Client.displayRes(Polarity, agreement, subjectivity, confidence, irony);
            hideLoading();
            showToast('Results have been successfully evaluated.', 'success');
        } catch (error) {
            hideLoading();
            console.error('Submission error:', error);
            showToast('An error occurred while submitting the article.', 'error');
        } finally {
            inputElement.value = '';
        }
    } else {
        showToast('Sorry, the URL you entered is not valid.', 'warning');
        inputElement.value = '';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
    setupEventListeners();
}

export { handleSubmit };
