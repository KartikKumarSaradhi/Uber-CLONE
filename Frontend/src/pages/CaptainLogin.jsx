import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/captainContext";


const CaptainLogin = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')

  const {captain, setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e)=>{
    e.preventDefault();

    const captain = {
      email:email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem("token", data.token)
        navigate("/captain-home")
      }
    } catch (error) {
      console.error("Login failed:", error)

    }

    setEmail('')
    setPassword('')  
  }



  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img
        className="w-20 mb-3 "
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
        <p className="text-center">Join a fleet?<Link to='/captain-signup' className="text-blue-600">Register as Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className="bg-[#53879c] flex items-center justify-center text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as User</Link> 
      </div>
    </div>
  );
};

export default CaptainLogin