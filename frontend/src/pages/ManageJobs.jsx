function ManageJobs(){


const jobs=[

{
id:1,
title:"Frontend Developer",
applicants:15
},


{
id:2,
title:"Backend Developer",
applicants:8
}


];



return(

<div>


<h1>
Manage Jobs
</h1>



{

jobs.map(job=>(


<div key={job.id}>


<h2>
{job.title}
</h2>


<p>
Applicants:
{job.applicants}
</p>



<button>
Edit
</button>



<button>
Delete
</button>



</div>


))

}



</div>

);


}


export default ManageJobs;