import {
useState
} from "react";


import ResumeUpload from "../components/ResumeUpload";



function Profile(){



const [profile,setProfile]=useState({

name:"",
skills:"",
experience:""

});



function change(e){


setProfile({

...profile,

[e.target.name]:
e.target.value

});


}



function save(e){

e.preventDefault();


console.log(profile);


alert(
"Profile Saved"
);


}



return(

<div>


<h1>
Applicant Profile
</h1>



<form onSubmit={save}>


<input

name="name"

placeholder="Full Name"

onChange={change}

/>



<input

name="skills"

placeholder="Skills"

onChange={change}

/>



<input

name="experience"

placeholder="Experience"

onChange={change}

/>



<button>
Save Profile
</button>


</form>



<ResumeUpload />


</div>

);


}


export default Profile;