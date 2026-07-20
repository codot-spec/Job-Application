import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";

function Login() {
const navigate = useNavigate();
const { login } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

async function submit(e) {
e.preventDefault();

try {
  const res = await loginUser({
    email,
    password,
  });

  login(res.data);

  const role = res.data.user.role;

  if (role === "employer") {
    navigate("/employer");
  } else {
    navigate("/applicant");
  }

} catch (err) {
  console.error(err);
  alert(err.response?.data?.message || "Login failed");
}

}

return ( <div> <h1>Login</h1>

  <form onSubmit={submit}>
    <input
      type="email"
      placeholder="Email"
      required
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      required
      onChange={(e) => setPassword(e.target.value)}
    />

    <button type="submit">Login</button>
  </form>
</div>

);
}

export default Login;
