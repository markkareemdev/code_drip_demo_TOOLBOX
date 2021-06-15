const fetch = require('node-fetch');

// loading redis library
const redis = require("redis");        
const client = redis.createClient();

// had to use promises to covert the redis to node async process
const { promisify } = require("util");   
const setAsync = promisify(client.set).bind(client);



const base_url = 'https://jobs.github.com/positions.json';

 async function fetchGithub(){

    console.log('fetching github');

    let result_count = 1; on_page =0;
    all_jobs = [];


    // fetch all pages


    while(result_count > 0){

    const res = await fetch(`${base_url}?page=${on_page}`);
    const jobs = await res.json();
                if (jobs.length > 0){
                    all_jobs.push(...jobs);
                    console.log('got ', jobs.length, 'jobs')
                    on_page++;
                }
                else
                    break;
   
    }

    console.log('got a total of ', all_jobs.length, 'jobs at this session' );

  

    //job filter algorithm
    
   const jrJobs = await all_jobs.filter( job =>{
       const  jobTitle = job.title.toLowerCase();
        let isJunior = true;

        if (
           jobTitle.includes('senior') ||
           jobTitle.includes('sr.') ||
           jobTitle.includes('manager') ||
           jobTitle.includes('architect')
        ){
            return false
        }else
         return true        
    })

    console.log('filtered down to ', jrJobs.length, 'junior developer jobs');



    // set in redis
    
    const success = await setAsync('github', JSON.stringify(jrJobs));
    console.log(success);


}


fetchGithub();
module.exports = fetchGithub;
