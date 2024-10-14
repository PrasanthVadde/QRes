import { Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signUp.scss';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = () => {
    const { username, mobile, email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      notification.error({ message: "Passwords do not match!" });
      return;
    }

    const newUser = { username, mobile, email, password };

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      notification.error({ message: "Username already exists!" });
      return;
    }

    dispatch(registerUser(newUser));
    notification.success({ message: "User registered successfully!" });
  };

  return (
    <div className="signUp-container">
      <h1>SignUp</h1>
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
      <Button type="primary" onClick={handleSignUp}>SignUp</Button>
      <p>Alredy a user?<Link to={"/signIn"}>Sign In</Link></p>
    </div>
  );
};

export default SignUp;
