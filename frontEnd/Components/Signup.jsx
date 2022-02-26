import axios from 'axios';
import React from 'react'
import {useState} from 'react'


function Signup() {
    const [user, setUser] = useState({
        email:"",
        password:""
    })

const handleSubmit = (e)=> {
    e.preventDefault();

    axios.post("http://localhost:4000/users/signup", user)
    .then((res) => console.log(res));

    setUser({email:"", password:""})
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
      Sign up :
        <input
          type="email"
          required
          placeholder="Enter your sign up email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          required
          placeholder="Enter your sign up password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default Signup