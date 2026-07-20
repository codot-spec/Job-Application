import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedJobs() {
      try {
        const res = await API.get("/users/saved-jobs");
        setSavedJobs(res.data);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedJobs();
  }, []);

  async function handleRemove(jobId) {
    try {
      await API.delete(`/users/save-job/${jobId}`);
      setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
      alert("Job removed from saved list");
    } catch (err) {
      console.error(err);
      alert("Error removing job");
    }
  }

  if (loading) return <h2>Loading saved jobs...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p>You haven't saved any jobs yet.</p>
      ) : (
        savedJobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link to={`/jobs/${job._id}`}>
                <button
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View Details & Apply
                </button>
              </Link>
              <button
                onClick={() => handleRemove(job._id)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedJobs;