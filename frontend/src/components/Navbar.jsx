import {
Link
} from "react-router-dom";


import {
useAuth
} from "../context/AuthContext";


import "./Navbar.css";



function Navbar(){


const {
user,

logout

}=useAuth();



return(

<nav className="navbar">


<div className="logo">

JobPortal

</div>



<ul>


<li>
<Link to="/">
Home
</Link>
</li>



<li>
<Link to="/jobs">
Jobs
</Link>
</li>



{

user ?


<>


<li>

<Link

to={
user.role==="employer"

? "/employer"

: "/applicant"

}

>

Dashboard

</Link>

</li>



<li>


<button onClick={logout}>

Logout

</button>


</li>


</>



:


<>


<li>

<Link to="/login">

Login

</Link>

</li>


<li>

<Link to="/register">

Register

</Link>

</li>


</>


}



</ul>


</nav>

);


}


export default Navbar;