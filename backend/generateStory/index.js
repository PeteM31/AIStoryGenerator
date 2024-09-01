const express = require('express');
const config = require('dotenv').config;
const OpenAI = require('openai').OpenAI;


// Load environment variables
config();

// Create a web server
const app = express();
const port = process.env.PORT || 3034;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

exports.handler = async (event) => {
  try{
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: "system", content: "You are a creative writer." },
        { role: "user", content: "Write a short story, about 250 words, about the following: " + event.storyPrompt },
      ],
      max_tokens: 600, // Adjust as needed for the story length
      temperature: 0.7,
    });
    console.log("completion: ");
    console.log(completion);

    const title = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: "system", content: "You are a creative writer." },
        { role: "user", content: "Give me a title for the following story: "+  completion.choices[0].message.content},
      ],
      max_tokens: 100, // Adjust as needed for the story length
      temperature: 0.7,
    });
    
    console.log("title: "+ title.choices[0].message.content);

    let cleanTitle = title.choices[0].message.content.replaceAll('*', '')
    console.log("cleantitle: " + cleanTitle)
    
    //create image based on the story
    const imagePrompt = "Create an image in the style of a cartoon animation of a childsbook for the following story: " + completion.choices[0].message.content;
    const image = await openai.images.generate({ model: "dall-e-3", prompt: imagePrompt });

    console.log(image.data);

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        message: "Request successful",
        data: { 
          message: completion.choices[0].message.content,
          image: image.data,
          title: cleanTitle//title.choices[0].message.content
          
        }
      })
    };

    return response;
   }catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message
      })
    };
  }
   

};