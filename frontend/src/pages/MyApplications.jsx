import {useEffect,useState} from "react";
import API from "../services/api.js";

function MyApplications(){


const [applications,setApplications]=useState([]);


useEffect(()=>{

API.get("/applications/my")
.then(res=>{

setApplications(res.data);

});


},[]);



return(

<div>


<h1>
My Applications
</h1>



{
applications.map((app,index)=>(

<div key={app._id}>

<h2>
{app.job.title}
</h2>


<p>
Company:
{app.job.company}
</p>


<p>
Status:
{app.status}
</p>

</div>

))
}


</div>

);


}



export default MyApplications;