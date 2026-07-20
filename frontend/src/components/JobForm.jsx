import { useState } from "react";
import "./JobForm.css";

function JobForm({ onSubmit }) {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: ""
  });

  function handleChange(e) {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  }

  async function submit(e) {
    e.preventDefault();

    try {
      await onSubmit(job);

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        description: ""
      });

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="job-form" onSubmit={submit}>

      <input
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        required
      />

      <input
        name="company"
        placeholder="Company Name"
        value={job.company}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
      />

      <input
        name="salary"
        placeholder="Salary"
        value={job.salary}
        onChange={handleChange}
      />

      <input
        name="type"
        placeholder="Job Type"
        value={job.type}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Post Job
      </button>

    </form>
  );
}

export default JobForm;