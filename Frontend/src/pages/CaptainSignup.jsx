import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext.jsx";
import axios from "axios";

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const {captain, setCaptain} = React.useContext(CaptainDataContext)

  

    const submitHandler = async (e) => {
      e.preventDefault();
  
      const CaptainData = {
        fullname:{
          firstname:firstName,
          lastname: lastName
        },
        email: email,
        password:password,
        vehicle:{
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData)
    
        if(response.status === 200){
          const data = response.data
          setCaptain(data.captain)
          localStorage.setItem("token", data.token)
          navigate("/captain-home")
        }
      } catch (error) {
        console.error("Registration failed:", error)
        // You might want to add error handling UI here
      }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    }


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        ></img>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base font-medium mb-2">Whats your name?</h3>
          <div className="flex gap-3 mb-5">
            <input
              className="bg-[#eeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
              className="bg-[#eeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </div>

          <h3 className="text-base font-medium mb-2">Whats your email?</h3>
          <input
            required
            className="bg-[#eeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm "
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm "
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) =>{
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
          />

          <h3 className="text-base font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-3 mb-5">
            <input
              className="bg-[#eeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-[#eeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm"
              required
              type="text" 
              placeholder="License plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mb-5">
            <select
              className="bg-[#eeeee] w-1/2 rounded px-4 py-2 border text-lg"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
            
            <input
              className="bg-[#eeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm"
              required
              type="number"
              min="1"
              placeholder="Seating capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
          </div>

          <button
            className="bg-[#111] text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
            type="submit"
          >
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have account?
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy</span> and <span className='underline'> Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup