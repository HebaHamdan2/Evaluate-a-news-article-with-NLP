// js files
import { handleSubmit } from './js/formHandler.js'
import { checkForArticle } from './js/articleChecker.js'
import { displayRes } from './js/displayResult.js'
import { submitArticle } from './js/submitUrl.js'
// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
// src/client/index.js
import logo from './imgs/logo.png';
document.getElementById('logo').src = logo;

export{
    handleSubmit ,checkForArticle ,displayRes,submitArticle
}
