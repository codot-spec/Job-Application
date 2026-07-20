import {
useState
} from "react";


function EmployerRegister(){


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
Employer Registration
</h1>



<form onSubmit={submit}>


<input

name="company"

placeholder="Company Name"

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

name="website"

placeholder="Company Website"

onChange={handleChange}

/>



<button>

Create Employer Account

</button>


</form>



</div>

);


}



export default EmployerRegister;