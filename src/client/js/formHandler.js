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
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

function hideLoading() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
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
}

async function handleSubmit(event) {
    event.preventDefault();
   
    try {
        const url = document.getElementById('text').value;
        if (!Client.checkForArticle(url)) {
            showToast('Sorry, the URL you entered is not valid.', 'warning');
            document.getElementById('text').value = '';
            return;
        } else {
            showLoading();
            const result = await Client.submitArticle(url, serverURL);
            Client.displayRes(result.score_tag, result.agreement, result.subjectivity, result.confidence, result.irony);
            hideLoading();
            showToast('Results have been successfully evaluated.', 'success');
        }
    } catch (error) {
        showToast('An error occurred while submitting the article.', 'error');
        if (document.getElementById('loadingIndicator')?.style.display === 'block') {
            hideLoading();
        }
    } finally {
        if (document.getElementById('loadingIndicator')?.style.display === 'block') {
            hideLoading();
        }
        document.getElementById('text').value = '';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
    setupEventListeners();
}

export { handleSubmit, showToast };
