import {
useState
} from "react";


function ApplicantRegister(){


const [form,setForm]=useState({});


function handleChange(e){


setForm({

...form,

[e.target.name]:
e.target.value

});


}



function submit(e){

e.preventDefault();


console.log(form);


}



return(

<div>


<h1>
Applicant Registration
</h1>



<form onSubmit={submit}>


<input

name="name"

placeholder="Full Name"

onChange={handleChange}

/>


<input

name="email"

placeholder="Email"

onChange={handleChange}

/>


<input

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

/>


<input

name="skills"

placeholder="Skills"

onChange={handleChange}

/>


<button>
Create Account
</button>


</form>


</div>

);


}


export default ApplicantRegister;