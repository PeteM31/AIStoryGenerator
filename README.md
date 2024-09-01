# AIStoryGenerator
Copyright 2024 Peter Mangum Jr.  All Rights Reserved.

## Application
This is a React app with a NodeJS function that calls OpenAI API to generate a story and accompanying image.

## Framework

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **OpenAI API**: The GPT-4 model powers the story generation.
- **React Frontend**: A web app developed in React.


## Local Setup
1 - Clone Repository
2 - Install NPM
3 - Run the app locally: Go to the my-app folder and run npm start

## Additional Setup
To run the backend, you need to deploy the backend/generateStory folder to a service such as lambda on AWS.
Also to access the OpenAI api, you must create an API key and then create an .env file for the backend that has OPENAI_API_KEY=your-api-key-here or manually set the ENV Variables on the Lambda function.



