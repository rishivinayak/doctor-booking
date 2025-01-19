import axios from '../../../utils/axios';
import { Button, Input } from 'antd';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });

  const onChange = e => {
    const { name, value } = e.target;
    setLogin(prevState => ({ ...prevState, [name]: value }));
  };

  const onLogin = async () => {
    if (!login.email || !login.password) {
      alert('Please fill in both email and password.');
      return;
    }
    try {
      const response = await axios.post('/admin/login', login);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('ROLE', response.data.role);
      navigate('/admin/department');
    } catch (error) {
      console.error('Login unsuccessful:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <div className="container">
        <div className="heading">DOCTOR BOOKING APP</div>
        <div className="main">
          <h1>Email:</h1>
          <Input
            name="email"
            value={login.email}
            onChange={onChange}
            type="email"
            placeholder="Enter your email"
          />

          <h1>Password:</h1>
          <Input
            name="password"
            value={login.password}
            onChange={onChange}
            type="password"
            placeholder="Enter your password"
          />
          <Button onClick={onLogin} className="login-button">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
