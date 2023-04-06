const router = require('express').Router();
const fs = require('fs')
const path = require('path') 

router.get('/', (req, res) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, '../data/treamentCenters.json')); 
    const treamentCenters = JSON.parse(rawData); 
    console.log(treamentCenters)
    res.status(200).json(treamentCenters);
  });
  

module.exports = router;