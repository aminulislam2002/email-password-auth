import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };
  // Note: Uporer code gulo extra example code code,

  const handleSubmit = (event) => {
    // 1. Prevent page refresh
    event.preventDefault();
    
    // 2. Collect from data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    // 3. Create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h4 className="text-primary">Please Register</h4>
      <form onSubmit={handleSubmit}>
        {/* <input className="w-50 mb-4 rounded ps-2" type="text" name="name" id="name" placeholder="Your Name" required /> */}
        <br />
        <input
          className="w-50 mb-4 rounded ps-2"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
        <br />
        <input
          className="w-50 mb-4 rounded ps-2"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
