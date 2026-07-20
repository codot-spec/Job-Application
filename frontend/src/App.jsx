import {
  Routes,
  Route
} from "react-router-dom";
import Footer from "./components/Footer";


import Navbar from "./components/Navbar";


import Home from "./pages/Home";

import Jobs from "./pages/Jobs";

import Login from "./pages/Login";

import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import ApplicantRegister from "./pages/ApplicantRegister";

import EmployerRegister from "./pages/EmployerRegister";
import EmployerDashboard 
from "./pages/EmployerDashboard";


import PostJob 
from "./pages/PostJob";


import ManageJobs 
from "./pages/ManageJobs";


import Applicants 
from "./pages/Applicants";

import ApplicantDashboard
from "./pages/ApplicantDashboard";


import Profile
from "./pages/Profile";


import MyApplications
from "./pages/MyApplications";


import SavedJobs
from "./pages/SavedJobs";

import ProtectedRoute from "./components/ProtectedRoute";


function App(){


return (

<>


<Navbar />


<Routes>


<Route
path="/"
element={<Home />}
/>

<Route

path="/register/applicant"

element={<ApplicantRegister/>}

/>

<Route

path="/employer"

element={

<ProtectedRoute role="employer">

<EmployerDashboard/>

</ProtectedRoute>

}

/>



<Route

path="/employer/post-job"

element={

<ProtectedRoute role="employer">

<PostJob/>

</ProtectedRoute>

}

/>


<Route

path="/employer/jobs"

element={

<ProtectedRoute role="employer">

<ManageJobs/>

</ProtectedRoute>

}

/>



<Route

path="/employer/applicants"

element={<Applicants/>}

/>

<Route

path="/register/employer"

element={<EmployerRegister/>}

/>

<Route

path="/applicant"

element={

<ProtectedRoute role="applicant">

<ApplicantDashboard/>

</ProtectedRoute>

}

/>



<Route

path="/profile"

element={

<ProtectedRoute role="applicant">

<Profile/>

</ProtectedRoute>

}

/>



<Route

path="/applications"

element={<MyApplications/>}

/>



<Route

path="/saved-jobs"

element={<SavedJobs/>}

/>

<Route
path="/jobs"
element={<Jobs />}
/>

<Route
path="/jobs/:id"
element={<JobDetails/>}
/>

<Route
path="/login"
element={<Login />}
/>


<Route
path="/register"
element={<Register />}
/>


</Routes>
<Footer />

</>


);


}



export default App;