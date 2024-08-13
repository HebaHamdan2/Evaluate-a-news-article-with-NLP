function checkForArticle(url) {
    if (url === null || url === undefined || url.trim() === '') {
        return false;
    }
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}

export { checkForArticle };
