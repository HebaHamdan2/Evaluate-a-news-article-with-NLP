function displayRes(Polarity,agreement,subjectivity,confidence,irony){
    const resultElement = document.getElementById('sentimentResult');
    resultElement.innerHTML = '';
    const polarityMap = {
        'P+': 'Strong Positive',
        'P': 'Positive',
        'NEU': 'Neutral',
        'N': 'Negative',
        'N+': 'Strong Negative',
        'NONE': 'Without'
    };
    const results = [
        { name: ' Polarity', value: polarityMap[Polarity] || 'Unknown' },
        { name: '', value: agreement },
        { name: '', value: subjectivity },
        { name: ' Confidence', value: confidence+'%' },
        { name: '', value: irony }
    ];
    results.forEach(result => {
        const box = document.createElement('div');
        box.className = 'result-box';
        const title = document.createElement('span');
        title.textContent = (result.name || '').toUpperCase(); 
        title.style.fontWeight = 'bold';
        title.style.fontSize = '25px'; 

        const value = document.createElement('span');
        value.textContent = result.value || '';
        value.style.fontWeight = 'bold';
        value.style.fontSize = '25px'; 
        box.appendChild(value);
        box.appendChild(title);
        
        resultElement.appendChild(box);
    });
}

 export {displayRes}