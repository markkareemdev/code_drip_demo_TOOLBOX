import React from 'react';
import './App.css';



function Job({job}){
    return(
        <div className={job}>
            {job.title}
            
            {job.company}
        </div>
    )
}


export default Job;