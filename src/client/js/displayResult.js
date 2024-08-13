function displayRes(data){
    const resultElement = document.getElementById('sentimentResult');
    
    if (data.error) {
        resultElement.innerHTML = `<p>${data.error}</p>`;
    } else {
        resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
}
 export {displayRes}