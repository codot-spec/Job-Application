import { Link } from "react-router-dom";

import "./JobCard.css";


function JobCard({job}){


return(

<div className="job-card">


<h2>
{job.title}
</h2>


<h3>
{job.company}
</h3>


<p>
📍 {job.location}
</p>


<p>
💰 {job.salary}
</p>


<p>
💼 {job.type}
</p>



<Link to={`/jobs/${job._id}`}>

<button>
View Details
</button>

</Link>


</div>

);


}


export default JobCard;