# Overview
Evaluate a news article with NLP is a single page application designed for the Udacity Frontend Web Developer Nanodegree.
This project allows users to enter a valid URL and receive an evaluation of the article's sentiment using the [MeaningCloud](https://www.meaningcloud.com/) Sentiment Analysis API.

The application provides insights into the article's polarity, confidence, agreement, subjectivity, and irony.
The project utilizes tools such as Webpack for build automation, Sass for styling, and Jest for testing. It is designed to offer hands-on experience with these tools and to understand their roles in building a frontend application.

https://github.com/user-attachments/assets/b22e5b67-c612-409e-ab6b-0451f53e029f


# Technologies Used

- **Webserver**: Node.js
  - Manages backend server operations and request handling.

- **Web Application Framework**: Express
  - Facilitates backend server routing and API management.

- **Build Tool**: [Webpack](https://webpack.js.org/)
  - **Development Mode**:
    - Features Hot Module Replacement (HMR) for real-time updates.
    - Includes source maps for easier debugging.
  - **Production Mode**:
    - Minifies code and optimizes assets for performance.
    - Splits code into bundles for improved load times.
    - Integrates service workers to enhance offline capabilities.

- **External Script**: Service Worker
  - Provides offline functionality and caching for better performance.

- **External API**: [MeaningCloud](https://www.meaningcloud.com/)
  - Delivers sentiment analysis to evaluate and interpret news articles.

# Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/HebaHamdan2/Evaluate-a-news-article-with-NLP.git
   ```
2. **Install Dependencies**
   
   Install the necessary npm packages:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**

Create a .env file in the root of your project directory with the following content:
```bash
API_KEY=your_api_key
```
# Scripts
Here are the available npm scripts:
 - Start the Server
  ```bash
  npm start
  ```

 - Start Development Server
  ```bash
  npm run build-dev
  ```
 - Build for Production
```bash
npm run build-prod
```
- Run Tests
```bash
npm run test
```
# Reviewer Note
![Screenshot (1271)](https://github.com/user-attachments/assets/97f4719c-0d0e-4235-a72f-528dc0ae30a7)
