const express = require('express');
const app = express();
const cors = require('cors');
const testimonialRouter = require('./routes/testimonial');
const treatmentCenters = require ('./routes/maps')


app.use(cors());
app.use(express.json());
app.use('/testimonial', testimonialRouter);
app.use('/maps', treatmentCenters);
app.use (express.static('public'))


// Starts the  server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});




// const express = require('express');
// const app = express();
// const cors = require('cors');
// const axios = require('axios');
// const testimonialRouter = require('./routes/testimonial');

// app.use(cors());
// app.use(express.json());
// app.use('/testimonial', testimonialRouter);
// app.use(express.static('public'));

// // Define route to act as a proxy to the Twitter API
// app.get('/api/tweets', async (req, res) => {
//   try {
//     const endpoint = 'https://api.twitter.com/2/users/by/username/FreedomToronto/tweets?max_results=10&tweet.fields=created_at,public_metrics&user.fields=profile_image_url';


//     const config = {
//       headers: {
//         Authorization: `Bearer "AAAAAAAAAAAAAAAAAAAAAEkjmgEAAAAA2RWnqpB%2FG42o1OQ6iFfJ0v2F%2BkA%3DQ06xaApBDokEzYBDJKaYEtfkYdHXOTaYL60CnC0jhh0zvJfPWE"}`
//       },
//     };

//     const response = await axios.get(endpoint, config);

//     res.send(response.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error fetching tweets');
//   }
// });

// // Starts the server
// app.listen(8080, () => {
//   console.log('Server started on port 8080');
// });

