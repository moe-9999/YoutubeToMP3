const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Express server
const app = express();
app.use(cors());

// PORT
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Respond OK to OPTIONS requests
  }
  
  next();
});

app.post('/server', async (req, res) => { 
  const videoID = req.body.videoID;

  if (!videoID || videoID.trim() === '') {
    return res.json({ success: false, message: 'Please enter another URL' });
  } else {
    try {
      const response = await axios.get(
        `https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`,
        {
          headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST,
          },
        }
      );

      // Assuming the API returns JSON directly
      const fetchResponse = response.data;

      console.log(fetchResponse);

      // Send the fetchResponse back to the React frontend
      return res.json({
        success: true,
        message: 'Successfully fetched data',
        data: fetchResponse,
      });
    } catch (error) {
      console.error('Fetch error:', error.message);
      return res.json({ success: false, message: 'Error fetching data' });
    }
  }
});

// START APPLICATION
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
