import React from 'react'
import {useState} from 'react'
import axios from 'axios'

function Login() {
    const [login, setLogin] = useState( {
        email:"",
        password:""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/users/login", login)
        .then(res => console.log(res.data));

        setLogin({ email: "", password: "" });
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <input
          type="password"
          required
          placeholder="Enter your password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login