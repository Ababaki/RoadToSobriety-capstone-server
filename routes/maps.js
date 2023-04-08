const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const CKAN_BASE_URL =
  "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action";

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${CKAN_BASE_URL}/package_show?id=wellbeing-youth-substance-use-treatment`
    );

    const promises = [];

    for (let { datastore_active, id } of response.data.result.resources) {
      if (datastore_active) {
        // endpoint only takes formData
        const formData = new FormData();
        formData.append("resource_id", id);
        formData.append("limit", 500);
        // get all active datastores
        promises.push(
          axios.post(`${CKAN_BASE_URL}/datastore_search`, formData)
        );
      }
    }

    // uncommment in order to test default response in case of api failiure
    // throw Error();

    // wait for requests to resolve
    const datastores_responses = await Promise.all(promises);
    let records = [];

    for (let { data } of datastores_responses) {
      records = records.concat(data.result.records);
    }

    if (records.length > 0) {
      console.log("success");
      res.status(200).json({ features: records });
    } else {
      // go to catch and use default stale data
      throw Error("Empty response");
    }
  } catch (e) {
    console.log(e);
    const rawData = fs.readFileSync(
      path.resolve(__dirname, "../data/treamentCenters.json")
    );
    const treamentCenters = JSON.parse(rawData);
    const records = [];
    // format it to have the same format as the api response
    for (let { properties, geometry } of treamentCenters.features) {
      records.push({ ...properties, geometry: JSON.stringify(geometry) });
    }
    res.status(200).json({ features: records });
  }
});

module.exports = router;