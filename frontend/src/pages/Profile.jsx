import { useState, useEffect } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
  });
  const [resumeUrl, setResumeUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await API.get("/users/profile");
        setProfile({
          name: res.data.name || "",
          skills: res.data.skills ? res.data.skills.join(", ") : "",
        });
        setResumeUrl(res.data.resume || "");
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    fetchProfile();
  }, []);

  function handleInputChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function saveProfileText(e) {
    e.preventDefault();
    try {
      const formattedSkills = profile.skills
        ? profile.skills.split(",").map((s) => s.trim())
        : [];

      await API.put("/users/profile", {
        name: profile.name,
        skills: formattedSkills,
      });

      alert("✨ Profile details saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile details.");
    }
  }

  async function handleResumeUpload(e) {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const res = await API.post("/users/upload-resume", formData);
      
      alert("📄 Resume uploaded successfully!");
      setResumeUrl(res.data.url);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="profile-container">
      <h1>Applicant Profile</h1>
      
      <div style={{ background: "#f3f4f6", padding: "20px", borderRadius: "8px", marginBottom: "24px", textAlign: "left" }}>
        <h3>Your Current Information</h3>
        <p><strong>Name:</strong> {profile.name || "Not set yet"}</p>
        <p><strong>Skills:</strong> {profile.skills || "None listed"}</p>
        <p>
          <strong>Resume:</strong>{" "}
          {resumeUrl ? (
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#2563eb", textDecoration: "underline", fontWeight: "600" }}
            >
              📄 View Current Uploaded Document
            </a>
          ) : (
            <span style={{ color: "#dc2626" }}>No resume uploaded yet</span>
          )}
        </p>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", margin: "24px 0" }} />

      <form onSubmit={saveProfileText} className="profile-form">
        <h3>Update Details</h3>
        <input
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="skills"
          placeholder="Skills (e.g. React, Node, CSS)"
          value={profile.skills}
          onChange={handleInputChange}
        />
        <button type="submit">Save Profile Details</button>
      </form>

      <div className="resume-section">
        <h3>Upload / Replace Resume</h3>
        <form onSubmit={handleResumeUpload} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="file"
            accept="application/pdf, image/jpeg, image/png, image/jpg"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ border: "none", padding: "0" }}
          />
          <button 
            type="submit" 
            disabled={uploading}
            style={{ 
              background: uploading ? "#9ca3af" : "#10b981", 
              color: "white", 
              border: "none", 
              padding: "10px 20px", 
              borderRadius: "8px", 
              cursor: uploading ? "not-allowed" : "pointer" 
            }}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;