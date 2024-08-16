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


