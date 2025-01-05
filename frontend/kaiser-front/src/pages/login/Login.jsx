import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";



const Login = () => {
  const [userName , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const {loading , login} = useLogin()


  const hanSubmit = async(e) => {
    e.preventDefault()
    await login(userName , password)
    toast.success('logged in')
  }
  return (
    <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-600">Kaiser Chat</span>
        </h1>
        <form onSubmit={hanSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full h-10"
              value={userName}
              onChange={(e) => setUsername( e.target.value )}
            />
          </div>
          <div>
            <label className="label p-2">
                <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
              value={password}
              onChange={(e) => setPassword( e.target.value)}
            />
          </div>
          <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Not Have an Account ? Signup
          </Link>
          <div>
            <button className="btn btn-primary btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span>: 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
