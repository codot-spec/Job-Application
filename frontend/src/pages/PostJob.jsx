import API from "../services/api";
import JobForm from "../components/JobForm";


function PostJob(){



async function createJob(job){

try{

await API.post(
"/jobs",
job
);


alert(
"Job Posted Successfully"
);

}

catch(err){

console.log(err);

alert("Error posting job");

}

}



return(

<div>


<h1>
Post New Job
</h1>



<JobForm

onSubmit={createJob}

/>



</div>

);


}



export default PostJob;