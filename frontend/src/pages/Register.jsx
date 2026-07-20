import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
const navigate = useNavigate();

const [form, setForm] = useState({
role: "applicant",
name: "",
email: "",
password: "",
});

const handleSubmit = async (e) => {
e.preventDefault();

try {
  await registerUser(form);

  alert("Registered successfully");
  navigate("/login");

} catch (err) {
  console.error(err);
  alert(err.response?.data?.message || "Error");
}

};

return ( <div> <h2>Register</h2>

  <form onSubmit={handleSubmit}>
    <select
      onChange={(e) =>
        setForm({ ...form, role: e.target.value })
      }
    >
      <option value="applicant">Applicant</option>
      <option value="employer">Employer</option>
    </select>

    <input
      placeholder="Name"
      required
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      placeholder="Email"
      required
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      required
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <button type="submit">Register</button>
  </form>
</div>

);
};

export default Register;
