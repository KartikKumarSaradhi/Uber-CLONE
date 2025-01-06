import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullName:{
        firstname:firstName,
        lastname: lastName
      },
      email: email,
      password:password,

    })
  
    setEmail("")
    setFirstName("")
    setLastName("")
    setPassword("")

  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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

          <button
            className="bg-[#111] text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-sm "
            type="submit"
          >
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have account?
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By proceedings you consent to get calls, whatsapp or SMS messages,
          including by automated means, from Uber and its affliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
