import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error loading job details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadJob();
  }, [id]);

  async function applyToJob() {
    try {
      await API.post("/applications/apply", { jobId: id });
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "You have already applied or an error occurred.");
    }
  }

  async function saveJob() {
    try {
      await API.post(`/users/save-job/${id}`);
      alert("Job Saved");
    } catch (err) {
      alert("Could not save job");
    }
  }

  if (loading) return <h1>Loading job details...</h1>;
  if (!job) return <h1>Job not found</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job.title}</h1>
      <h2>{job.company}</h2>
      <p>{job.description}</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={applyToJob}>Apply Now</button>
        <button onClick={saveJob}>Save Job</button>
      </div>
    </div>
  );
}

export default JobDetails;