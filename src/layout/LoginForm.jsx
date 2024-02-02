import axios from "axios";
import React, { useState,useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const {setUser} = useAuth()
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      //validation
      const rs = await axios.post("http://localhost:8889/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8889/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });

      console.log(rs1.data);
      setUser(rs1.data)
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <form className='flex gap-4 flex-col max-w-[500px] mx-auto px-2 mt-5 shadow-lg rounded-md py-5' onSubmit={hdlSubmit}>
        <h1 className='text-center text-2xl font-bold mt-7'>Login</h1>
        <label className="form-control">
            <div className="label">
                <span className="label-text text-[16px]">Username</span>
            </div>
            <input name='username' value={input.username} onChange={hdlChange} type="text" placeholder="Enter username" className="input input-bordered" />
        </label>
        <label className="form-control">
            <div className="label">
                <span className="label-text text-[16px]">Password</span>
            </div>
            <input name='password' value={input.password} onChange={hdlChange} type="password"  placeholder="Enter password" className="input input-bordered" />
        </label>
       
        <div className='flex flex-col gap-5 my-5'>
            <button type='submit' className='btn btn-outline btn-success'>Login</button>
        </div>
    </form>
)
}
