import {
useState
} from "react";

import "./JobForm.css";


function JobForm({onSubmit}){


const [job,setJob]=useState({

title:"",
company:"",
location:"",
salary:"",
type:"",
description:""

});



function handleChange(e){


setJob({

...job,

[e.target.name]:
e.target.value

});


}



function submit(e){

e.preventDefault();


onSubmit(job);



}



return(

<form
className="job-form"
onSubmit={submit}
>


<input

name="title"

placeholder="Job Title"

onChange={handleChange}

/>



<input

name="company"

placeholder="Company Name"

onChange={handleChange}

/>



<input

name="location"

placeholder="Location"

onChange={handleChange}

/>



<input

name="salary"

placeholder="Salary"

onChange={handleChange}

/>



<input

name="type"

placeholder="Job Type"

onChange={handleChange}

/>



<textarea

name="description"

placeholder="Job Description"

onChange={handleChange}

/>



<button>

Post Job

</button>


</form>

);


}


export default JobForm;