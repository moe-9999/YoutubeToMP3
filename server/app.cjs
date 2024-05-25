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


app.post('/api', async (req, res) => {
  const videoID = req.body.videoID;
  if (!videoID || videoID.trim() === '') {
    return res.json({ success: false, message: 'Please enter another URL' });
  } else {
    try {
      const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`, {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': process.env.API_HOST
        }
      });

      const fetchResponse = await fetchAPI.json();

      console.log(fetchResponse)

      // Send the fetchResponse back to the React frontend
      return res.json({ success: true, message: 'Successfully fetched data', data: fetchResponse });
    } catch (error) {
      console.error('Fetch error:', error);
      return res.json({ success: false, message: 'Error fetching data' });
    }
  }
});


// START APPLICATION
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
