function SavedJobs(){



const saved=[

"React Developer",

"UI Designer",

"Data Analyst"

];



return(

<div>


<h1>
Saved Jobs
</h1>



{

saved.map(

(job,index)=>(


<div key={index}>


<h2>
{job}
</h2>


<button>
Apply
</button>



</div>


)

)


}



</div>

);


}


export default SavedJobs;