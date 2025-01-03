import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const UserLogin = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e)=>{
    e.preventDefault();

    setUserData({
      email:email,
      password: password
    })
    setEmail('')
    setPassword('')  
  }

  useEffect(()=>{
    console.log(userData);
  },[userData])

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img
        className="w-16 mb-10 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      ></img>

      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className="text-lg font-medium mb-2">Whats your email?</h3>
        <input
          required
          value={email}
          onChange={(e)=>{
          setEmail(e.target.value)}}
          className="bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
        />

        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
          required
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          className="bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          type="password"
          placeholder="password"
          autoComplete="current-password"
        />

        <button
          className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base "
          type="submit"
        >
          Login
        </button>

      </form>
        <p className="text-center">New Here?<Link to='/signup' className="text-blue-600">Create New Account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#47634e] flex items-center justify-center text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link> 
      </div>
    </div>
  );
};

export default UserLogin;
