const express = require('express');
const app = express();
const cors = require('cors');
const testimonialRouter = require('./routes/testimonial');
const treatmentCenters = require ('./routes/maps')


app.use(cors());
app.use(express.json());
app.use('/testimonial', testimonialRouter);
app.use('/maps', treatmentCenters);


app.use(express.static('public'))

// Starts the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});


