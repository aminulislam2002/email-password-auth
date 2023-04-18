import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const [error, setError] = useState(" ");
  const [success, setSuccess] = useState(" ");

  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    // 1. Prevent page refresh
    event.preventDefault();

    setSuccess(" ");
    setError(" ");

    // 2. Collect from data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    // 4. Password Validate
    /**
     * 1. At least one uppercase character /(?=.*[A-Z])/
     * 2. At least one lowercase character /(?=.*[a-z])/
     * 3. At least one number /(?=.*[0-9])/
     * 4. Minimum 8 characters /(?=).{8}/
     *  */

    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please provide at least 'one uppercase'");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setError("Please provide at least 'one lowercase'");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setError("Please provide at least 'one number'");
      return;
    } else if (password.length < 8) {
      setError("Please add at least 8 characters in your password!");
      return;
    }

    // 3. Create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setError(" ");
        setSuccess("User has been created Successfully!");
        event.target.reset();
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
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
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
