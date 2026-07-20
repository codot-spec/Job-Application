function Applicants(){


const applicants=[


{
name:"Alex Sharma",
skills:"React, Node.js"
},


{
name:"John Smith",
skills:"Java, Spring"
}


];



return(

<div>


<h1>
Applicants
</h1>


{

applicants.map(
(person,index)=>(


<div key={index}>


<h2>
{person.name}
</h2>


<p>
Skills:
{person.skills}
</p>



<button>
View Resume
</button>



<button>
Accept
</button>



<button>
Reject
</button>



</div>


)

)


}



</div>


);


}


export default Applicants;