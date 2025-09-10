import React from 'react'
import Template from '../components/auth/Template';
import loginPageStudImg from '../assets/loginPageStudImg.webp'


function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginPageStudImg}
      formType="login"
    />
  );
}

export default Login
