import React, { useRef, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/loginSlice";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
const Login = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loginState=useSelector(state=>state.loginReducer.login)
  const dispatch=useDispatch()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const passwordRef = useRef("");
  const emailRef = useRef("");
  async function loginUser() {
    if (!emailRef.current.value || !passwordRef.current.value) {
      alert("Incorrect Input");
    } else {
      const response = await axios.post(`https://44.215.170.76:5000/loginUser`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      const data = await response.data;
      try {
        if (data.ok) {
          emailRef.current.value = "";
          passwordRef.current.value = "";
          localStorage.setItem("idToken", data.token);
          dispatch(loginAction.setLogin(true))
          
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
  return (
    <>
      {loginState&&<Redirect to='/Home'/>}
    <div className="form_layout">
      <h4>LOGIN</h4>
      <FloatingLabel label="Email">
        <Form.Control
          type="email"
          placeholder="name@gmail.com"
          id="input"
          ref={emailRef}
        />
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          id="input"
          ref={passwordRef}
        />
      </FloatingLabel>
      <Form.Check
        type="checkbox"
        label="Show Password"
        onChange={togglePasswordVisibility}
        style={{ color: "aliceblue", textAlign: "left" }}
        id="check"
        for="check"
      />
      <Button variant="dark" type="button" onClick={loginUser}>
        Login
      </Button>
      <span className="link" onClick={() => props.onSetPage("signup")}>New user? Sign Up</span>
    </div>
    </>
  );
};

export default Login;
