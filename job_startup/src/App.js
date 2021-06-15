import React,{ useState , useEffect} from 'react';
import './App.css';
import Jobs from './jobs'

const  JOB_URL_API = "http://localhost:3001/jobs";


// temporary api that could return jobs
const mockJobs = [

  {title:  "SWE 1", company:  "Google"},
  {title: 'SWE 1', company:'Facebook'},
  {title: 'SWE 1', company:'Oracle'}

]


// using the fetch library of the browser since this is rendered in the browser

async function fetchJobs(updateCb){

  const res  = await fetch(JOB_URL_API);
  const json = res.json();
  updateCb(json);
  console.log(json);

}


function App() {

  const [jobList, updateJobs] = React.useState([]);

  // this acts as componentDidMount because it is initialised by an empty array
 
  React.useEffect(()=>{
    fetchJobs(updateJobs)
  }, [])

  return (
    <div className="App">

      {/* linked the temporary Api with my components via props message */}
      <Jobs jobs={mockJobs} />  

    </div>
  );
 
}

export default App;
