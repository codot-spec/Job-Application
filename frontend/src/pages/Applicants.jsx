import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await API.get(`/applications/job/${jobId}`);
        setApplicants(res.data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    }
    if (jobId) fetchApplicants();
  }, [jobId]);

  async function handleStatusUpdate(applicationId, newStatus) {
    try {
      const res = await API.put(`/applications/${applicationId}`, { status: newStatus });
      setApplicants(applicants.map(app => app._id === applicationId ? { ...app, status: res.data.status } : app));
      alert(`Application updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  if (loading) return <h2>Loading applicants...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Applicants</h1>
      {applicants.length === 0 ? (
        <p>No one has applied to this position yet.</p>
      ) : (
        applicants.map((app) => (
          <div key={app._id} style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "8px" }}>
            <h2>{app.applicant?.name || "Anonymous Applicant"}</h2>
            <p><strong>Email:</strong> {app.applicant?.email}</p>
            <p>
              <strong>Current Status:</strong>{" "}
              <span style={{ fontWeight: "bold", color: app.status === "accepted" ? "green" : app.status === "rejected" ? "red" : "orange" }}>
                {app.status}
              </span>
            </p>
            
            {app.applicant?.resume && (
              <p>
                <a href={app.applicant.resume} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                  📄 View Resume
                </a>
              </p>
            )}

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button 
                onClick={() => handleStatusUpdate(app._id, "accepted")}
                style={{ background: "#16a34a", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
              >
                Accept
              </button>
              <button 
                onClick={() => handleStatusUpdate(app._id, "rejected")}
                style={{ background: "#dc2626", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Applicants;