

import {useEffect,useState} from "react";
import API from "../services/api";

import JobCard from "../components/JobCard";

import SearchBar from "../components/SearchBar";

import "./Jobs.css";



function Jobs(){


const [search,setSearch]=useState("");



const [jobs,setJobs]=useState([]);


useEffect(()=>{

async function loadJobs(){

const res = await API.get("/jobs");

setJobs(res.data);

}

loadJobs();

},[]);



return(


<div className="jobs-page">


<h1>
Find Jobs
</h1>



<SearchBar

search={search}

setSearch={setSearch}

/>



<div className="jobs-container">


{

jobs
.filter(job =>
job.title.toLowerCase()
.includes(search.toLowerCase())
)
.map(job=>(


<JobCard

key={job._id}

job={job}

/>


))

}


</div>


</div>


);


}


export default Jobs;