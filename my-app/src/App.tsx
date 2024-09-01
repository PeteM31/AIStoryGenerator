import React, { useState } from 'react';
import { Container, TextField, Button, Typography, CircularProgress, Grid, Box} from '@mui/material';
import logo from './logo.svg';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [currentState, setCurrentState] = useState('welcome');
  const [storyText, setStoryText] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyImageURL, setStoryImageURL] = useState('');

  type StoryAPIResponse<T> = {
    statusCode: number;
}
  const handleButtonClick = async () => {
    // alert(`You entered: ${inputValue}`);
    setCurrentState("processing");
    let result = await callLambdaFunction();
    // console.log(result);
    if(result.statusCode == 200){
      let bodyData = JSON.parse(result.body).data;
      console.log("bodyData")
      console.log(bodyData)
      setStoryText(bodyData.message)
      setStoryImageURL(bodyData.image[0].url)
      setStoryTitle(bodyData.title)
      setCurrentState("story");
    }else{
      setCurrentState("error");
    }
  };

  async function handleNewStoryButtonClick(){
    setInputValue("");
    setCurrentState("welcome");
    setStoryText("");
    setStoryTitle("");
    setStoryImageURL("");
  }

  async function callLambdaFunction(){
    try {
      const response = await fetch('https://hdu3cc11ha.execute-api.us-east-1.amazonaws.com/live', { //https://hdu3cc11ha.execute-api.us-east-1.amazonaws.com/
        method: 'POST', // or GET, depending on your method
        headers: {
          'Content-Type': 'application/json',
          // "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          // "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
          // "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
          // If your API requires authentication, include authorization headers here
        },
        body: JSON.stringify({ storyPrompt: inputValue }) // For POST requests
      });
  
      const data = await response.json();
      console.log('Success:', data);
      // console.log(JSON.parse(data.body))
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function welcomeScreen(){
    return( 
      <>
        <TextField
          fullWidth
          label="Type your story idea"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleButtonClick}
          fullWidth
        >
          Generate
        </Button>
        <Typography variant="h6" gutterBottom>
          Instructions: 
        </Typography>
        <Typography variant="body1" gutterBottom>
          Type an idea for a story you have and click Generate!
        </Typography>
        <Typography variant="body1" gutterBottom>
        Example: A young boy named Johnny goes on an adventure in a forest.
        </Typography>
      </>
    )
  }

  function processingScreen(){
    return(
      <>
         <CircularProgress />
         <Typography variant="h6" gutterBottom>
          Generating an awesome story...
        </Typography>
      </>
    )
  }

  function storyScreen(){
    return(
      <>
         <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {storyTitle}
          </Typography>
          <Box
            component="img"
            src={storyImageURL} //"https://via.placeholder.com/400"
            alt="Story Illustration"
            sx={{ width: '100%', borderRadius: 2, padding: 5 }}
          />
          <Typography variant="body1">
            {storyText}
          </Typography>
          <Button 
          sx={{marginTop: 5}}
          variant="contained" 
          color="primary" 
          onClick={handleNewStoryButtonClick}
          fullWidth
        >
          Create A New Story
        </Button>
        </Box>

      </>
    )
  }

  function storyScreenold(){
    return(
      <>
         <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Left side: Text */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Welcome to Story Generator
              </Typography>
              <Typography variant="body1">
                {storyText}
              </Typography>
            </Grid>

            {/* Right side: Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={storyImageURL} //"https://via.placeholder.com/400"
                alt="Story Illustration"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    )
  }

  function displayScreen(){
    switch(currentState) {
      case "welcome":
        return welcomeScreen();
        break;
      case "processing":
        return processingScreen();
        break;
      case "story":
        return storyScreen();
        break;
      default:
        return welcomeScreen();
    }
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Story Generator
      </Typography>
      {
        displayScreen()
      }
      
    </Container>
  );
}

export default App;
