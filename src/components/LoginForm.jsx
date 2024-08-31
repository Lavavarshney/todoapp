import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
const Login=({setActiveForm})=>{
const {loginUser}= useAuth();
const formRef=useRef(null);
const handleLogin = (e) => {
    e.preventDefault();
    loginUser(formRef.current.email.value, formRef.current.password.value);
  <p>Loggined in successfully</p>
};
return(
    <div>
                   <h1>Login</h1>

<form ref={formRef} onSubmit={handleLogin}>
    <div className="auth-field-wrapper">
        <label>Email:</label>
        <input type="email" name="email" />
    </div>

    <div className="auth-field-wrapper">
        <label>Password:</label>
        <input type="password" name="password" />
    </div>

    <div className="auth-field-wrapper">
        <input type="submit" value="Login" />
     
    </div>
</form>

<p>
    Don't have an account?{" "}
    <span
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => {
            setActiveForm("register");
        }}
    >
        Signup
    </span>
</p>

    </div>
)
};
export default Login;