import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [error, setError] = useState(" ");
  const [success, setSuccess] = useState(" ");

  const handleLoginForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(form, email, password);

    // Validation
    setError(" ");
    setSuccess(" ");

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Please add at least two uppercase.");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Please add a special character.");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 characters long");
      return;
    }
  };

  return (
    <div className="w-25 mx-auto">
      <h2>Please login</h2>
      <Form onSubmit={handleLoginForm}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" required />
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

      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
