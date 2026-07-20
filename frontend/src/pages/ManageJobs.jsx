import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployerJobs() {
      try {
        const res = await API.get("/jobs/employer/my-jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error loading employer jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEmployerJobs();
  }, []);

  async function handleDelete(jobId) {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await API.delete(`/jobs/${jobId}`);
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully");
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete job");
      }
    }
  }

  if (loading) return <div style={{ padding: "20px" }}>Loading jobs...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location || "Remote"}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link to={`/employer/applicants/${job._id}`}>
                <button
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View Applicants
                </button>
              </Link>

              <button
                onClick={() => handleDelete(job._id)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete Job
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageJobs;