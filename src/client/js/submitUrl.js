async function submitArticle(url, serverURL) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ endpoint: '/sentiment-2.1', url: url })
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
  
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }
  export { submitArticle };
  