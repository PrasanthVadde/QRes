import { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import './signIn.scss';

const SignIn = () => {
  const [form, setForm] = useState({
    usernameOrMobile: '',
    password: '',
  });

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignIn = () => {
    const { usernameOrMobile, password } = form;

    // Dispatch the action to login the user
    dispatch(loginUser({ usernameOrMobile, password }));

    if (currentUser) {
      notification.success({ message: "Login successful!" });
      // Redirect to dashboard or profile page
    } else {
      notification.error({ message: "Invalid username or password!" });
    }
  };

  return (
    <div className="signIn-container">
      <h1>SignIn</h1>
      <Input
        placeholder="Username / Mobile Number"
        name="usernameOrMobile"
        value={form.usernameOrMobile}
        onChange={handleChange}
      />
      <Input.Password
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button type="primary" onClick={handleSignIn}>SignIn</Button>
      <p>Not a user? <Link to={"/signUp"}>SignUp</Link></p>
    </div>
  );
};

export default SignIn;
