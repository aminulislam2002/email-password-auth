import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState(" ");
  const [success, setSuccess] = useState(" ");

  const emailRef = useRef();

  const handleLoginForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(form, email, password);

    // Validation
    setError(" ");
    setSuccess(" ");

    // if (!/(?=.*[A-Z])/.test(password)) {
    //   setError("Please provide at least 'one uppercase'");
    //   return;
    // } else if (!/(?=.*[a-z])/.test(password)) {
    //   setError("Please provide at least 'one lowercase'");
    //   return;
    // } else if (!/(?=.*[0-9])/.test(password)) {
    //   setError("Please provide at least 'one number'");
    //   return;
    // } else if (password.length < 8) {
    //   setError("Please add at least 8 characters in your password!");
    //   return;
    // }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        if (!loggedUser.emailVerified) {
          alert("Age email verification koro");
        }
        console.log(loggedUser);
        setSuccess("User login successfully!");
        setError(" ");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      alert("Please provide your email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="w-25 mx-auto">
      <h2>Please login</h2>
      <Form onSubmit={handleLoginForm}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" ref={emailRef} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <p>
        <small>
          Forget Password? Please{" "}
          <button onClick={handleResetPassword} className="btn btn-link">
            Reset Password
          </button>
        </small>
      </p>
      <p>
        <small>
          Are you new to this website? Please <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
