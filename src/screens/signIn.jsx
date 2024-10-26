import { useState } from "react";
import { Input, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./signIn.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase/firebase.js";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignIn = async () => {
    const { email, password } = form;

    if (!email || !password) {
      notification.error({ message: "Please enter both email and password!" });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      notification.success({ message: "Login successful!" });

      navigate("/profile");
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return (
    <div className="signIn-container">
      <h1>Sign In</h1>
      <Input
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <Input.Password
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button type="primary" onClick={handleSignIn}>
        Sign In
      </Button>
      <p>
        Not a user? <Link to="/signUp">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
