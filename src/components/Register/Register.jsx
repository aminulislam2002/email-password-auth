import React from "react";

const Register = () => {
  return (
    <div>
      <h4>Please Register</h4>
      <form>
        <input type="email" name="email" id="email" placeholder="Your Email..." />
        <br />
        <input type="password" name="password" id="password" placeholder="Your Password..." />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
