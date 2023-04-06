const router = require('express').Router();
const fs = require('fs')
const path = require('path') 
const {v4: uuid} = require('uuid') 

router.get('/', (req, res) => {
  const rawData = fs.readFileSync(path.resolve(__dirname, '../data/testimonials.json')); 
  const testimonials = JSON.parse(rawData); 
  console.log(testimonials)
  res.status(200).json(testimonials);
});


router.get('/:id', (req, res) => {
  const rawData = fs.readFileSync(path.resolve(__dirname, '../data/testimonials.json'));
  const testimonials = JSON.parse(rawData); 
  const testimonial = testimonials.find(testimonials => testimonials.id === req.params.id); 
  if (testimonial) {
    res.status(200).json(testimonials);
  } else {
    res.status(404).send('Testomonials not found');
  }
});


router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send({message: "Please ensure the fields are filled"});
  } 

  console.log(req.body)
  req.body.id = uuid(); 
  req.body.timestamp = Math.floor(Date.now() / 1000); 
  req.body.likes = "";
  req.body.authorName = "";
  console.log(req.body)
 
  const rawData = fs.readFileSync(path.resolve(__dirname, '../data/testimonials.json')); 
  let jsonData = JSON.parse(rawData); 
  jsonData.push(req.body); 
  fs.writeFileSync(path.resolve(__dirname, '../data/testimonials.json'), JSON.stringify(jsonData))
  return res.status(201).json(req.body);
});


module.exports = router;