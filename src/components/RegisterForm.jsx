import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
    const { registerUser } = useAuth();
    const formRef = useRef(null);

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        
        const userId = formData.get('id'); // Make sure there is an input field named 'id'
        const email = formData.get('email');
        const password = formData.get('password');
        
        registerUser( email, password,userId);
        console.log("signed up");
      };
      

    return (
        <div>
            <h1>Register</h1>
            <form ref={formRef} onSubmit={handleRegister}>
                <div className="auth-field-wrapper">
                    <label>Name:</label>
                    <input type="text" name="name" />
                </div>
                <div className="auth-field-wrapper">
                    <label>User Id:</label>
                    <input type="id" name="id" />
                </div>

                <div className="auth-field-wrapper">
                    <label>Email:</label>
                    <input type="email" name="email" />
                </div>

                <div className="auth-field-wrapper">
                    <label>Password:</label>
                    <input type="password" name="password" />
                </div>

                <div className="auth-field-wrapper">
                    <input type="submit" value="Signup" />
                </div>
            </form>

            <p>
                Already have an account?{" "}
                <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                   
                >
                    Login
                </span>
            </p>
        </div>
    );
};

export default RegisterForm;
