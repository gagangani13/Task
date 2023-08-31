import React, { useRef, useState } from "react";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^#?&])[A-Za-z\d@$!%*^#?&]{8,}$/;
    return passwordRegex.test(password);
  };


const SignUp = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailRef=useRef('')
  const passwordRef=useRef('')
  const nameRef=useRef('')


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  async function register(e) {
    e.preventDefault();
    if (!nameRef.current.value || !emailRef.current.value) {
        alert('please fill all the fields correctly to register')
    } else if (!validatePassword(passwordRef.current.value)){
        alert("Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.")
    }else{

        const response = await axios.post("http://44.215.170.76:5000/signupUser", {
              email: emailRef.current.value,
              password: passwordRef.current.value,
              name: nameRef.current.value,
            });
            const data = await response.data;
            try {
              if (data.ok) {
                alert(data.message);
                props.onSetPage('login')
              } else {
                throw new Error(data.message);
              }
            } catch (error) {
              alert("User exists try to login")
            }
    }
  }
  return (
    <>
      <div className="form_layout">
        <h4>SIGN UP</h4>
        <Form id="form" onSubmit={register}>
          <FloatingLabel  label="Name">
            <Form.Control type="text" placeholder="Name" id="input" required ref={nameRef} />
          </FloatingLabel>
          <FloatingLabel  label="Email">
            <Form.Control
              type="email"
              placeholder="name@gmail.com"
              id="input"
              ref={emailRef}
              required
            />
          </FloatingLabel>
          <FloatingLabel  label="Password">
            <Form.Control type={passwordVisible ? "text" : "password"} placeholder="Password" id="input" ref={passwordRef} required/>
          </FloatingLabel>
          <Form.Check
              type="checkbox"
              label="Show Password"
              onChange={togglePasswordVisibility}
              style={{color:'aliceblue',textAlign:'left'}}
              id='check'
              for='check'
            />
          <Button variant="dark" className="mt-3" type="submit">
            Sign Up
          </Button>
        </Form>
        <span className="link" onClick={()=>{props.onSetPage('login')}}>Already have an account? Login</span>
      </div>
    </>
  );
};

export default SignUp;
