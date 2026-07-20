import {
Link
} from "react-router-dom";


function EmployerDashboard(){


return(

<div>


<h1>
Employer Dashboard
</h1>



<p>
Welcome Employer
</p>



<Link to="/employer/post-job">

<button>
Post New Job
</button>

</Link>



<br/><br/>



<Link to="/employer/jobs">

<button>
Manage Jobs
</button>

</Link>



</div>

);


}


export default EmployerDashboard;