import { Input, Button, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './signUp.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase/firebase.js'; 

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = form;

    // Form validation
    if (password !== confirmPassword) {
      notification.error({ message: "Passwords do not match!" });
      return;
    }

    if (!email || !password) {
      notification.error({ message: "Please fill out all required fields!" });
      return;
    }

    try {
      // Firebase user registration
      await createUserWithEmailAndPassword(auth, email, password);

      notification.success({ message: "User registered successfully!" });
      
      // Redirect to Profile or another page after successful registration
      navigate("/profile");
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  // Function to handle guest login (no credentials required)
  const handleGuestLogin = () => {
    // Assuming you want to set a user in a guest state, or directly navigate to the profile page
    // You can also customize this behavior further as needed.
    notification.success({ message: "Logged in as a guest!" });
    navigate("/");  // Redirecting to profile page directly
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="signUp-container">
        <h1>Sign Up</h1>
        <Input
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          placeholder="Mobile Number"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
        />
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
        <Input.Password
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <Button type="primary" htmlType="submit">Sign Up</Button>
        
        
        <Button style={{color:'black'}} type="default" onClick={handleGuestLogin}>Guest Login</Button>
        
        <p>Already a user? <Link to="/signIn">Sign In</Link></p>
      </div>
    </form>
  );
};

export default SignUp;
