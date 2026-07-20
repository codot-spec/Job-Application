import {
useState
} from "react";



function ResumeUpload(){


const [file,setFile]=useState(null);



function upload(e){


setFile(
e.target.files[0]
);


}



return(

<div>


<h3>
Upload Resume
</h3>



<input

type="file"

onChange={upload}

/>



{

file &&

<p>
Selected:
{file.name}
</p>

}



</div>

);


}



export default ResumeUpload;