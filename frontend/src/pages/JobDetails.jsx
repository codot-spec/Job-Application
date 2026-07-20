import {useParams} from "react-router-dom";

import {useEffect,useState} from "react";

import API from "../services/api";



function JobDetails(){
async function saveJob(){

try{

await API.post(
`/users/save-job/${id}`
);


alert("Job Saved");

}

catch(err){

alert("Could not save job");

}

}

const {id}=useParams();



const [job,setJob]=useState(null);


useEffect(()=>{

async function loadJob(){

const res =
await API.get(`/jobs/${id}`);


setJob(res.data);

}


loadJob();


},[id]);



if(!job){

return <h1>
Job not found
</h1>

}



return(

<div>


<h1>
{job.title}
</h1>


<h2>
{job.company}
</h2>


<p>
{job.description}
</p>


<button>
Apply Now
</button>


<button onClick={saveJob}>
Save Job
</button>


</div>

);


}




export default JobDetails;