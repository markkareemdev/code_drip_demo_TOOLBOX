const express = require('express')
const app = express()
const port = 3001

// loading redis library
const redis = require("redis");        
const client = redis.createClient();

// had to use promises to covert the redis to node async process
const { promisify } = require("util");   
const getAsync = promisify(client.get).bind(client);


app.get('/jobs',  async (req, res) => {
    
    const jobs = await getAsync('github')
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(JSON.parse(jobs).length);
    res.send(jobs)  // you get this when you curl into this network
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))