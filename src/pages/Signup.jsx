import React from 'react'
import Template from '../components/auth/Template';
import signupPageImg from '../assets/signupPageImg.webp'

const Signup = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupPageImg}
      formType="signup"
    />
  );
}

export default Signup
