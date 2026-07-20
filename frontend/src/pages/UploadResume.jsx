import { useState } from "react";
import API from "../services/api";

const UploadResume = () => {
const [file, setFile] = useState(null);

const handleUpload = async () => {
const formData = new FormData();
formData.append("resume", file);

```
const res = await API.post(
  "/users/upload-resume",
  formData
);

alert("Uploaded: " + res.data.url);
```

};

return ( <div> <h2>Upload Resume</h2>

```
  <input
    type="file"
    accept="application/pdf"
    onChange={(e) => setFile(e.target.files[0])}
  />

  <button onClick={handleUpload}>
    Upload
  </button>
</div>

);
};

export default UploadResume;
