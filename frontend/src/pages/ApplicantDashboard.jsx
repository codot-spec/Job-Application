import {
Link
} from "react-router-dom";


function ApplicantDashboard(){


return(

<div>


<h1>
Applicant Dashboard
</h1>


<h3>
Welcome Applicant
</h3>



<Link to="/profile">

<button>
My Profile
</button>

</Link>



<br/><br/>



<Link to="/applications">

<button>
My Applications
</button>

</Link>



<br/><br/>

<Link to="/saved-jobs">
  <button>View Saved Jobs</button>
</Link>

<br/><br/>

<Link to="/jobs">

<button>
Search Jobs
</button>

</Link>



</div>

);


}


export default ApplicantDashboard;