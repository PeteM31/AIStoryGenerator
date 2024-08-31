import React, { useState } from 'react';
import { Container, TextField, Button, Typography, CircularProgress, Grid, Box} from '@mui/material';
import logo from './logo.svg';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [currentState, setCurrentState] = useState('welcome');


  const handleButtonClick = () => {
    alert(`You entered: ${inputValue}`);
    setCurrentState("story")
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
          Submit
        </Button>
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
          <Grid container spacing={2} alignItems="center">
            {/* Left side: Text */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Welcome to Story Generator
              </Typography>
              <Typography variant="body1">
                Create your own stories with the power of AI. Simply enter your story idea, and let our advanced algorithms generate a unique and engaging narrative for you.
              </Typography>
            </Grid>

            {/* Right side: Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://via.placeholder.com/400"
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
