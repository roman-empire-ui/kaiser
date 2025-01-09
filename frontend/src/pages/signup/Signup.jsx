import  { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import toast from "react-hot-toast";



const initialFormData = {
	fullName : '',
	userName : '',
	password : '',
	confirmPassword : '',
	gender :''
}
const Signup = () => {
	const [input , setInput] = useState(initialFormData)
	const {loading , signup} = useSignup() 
	const hanSubmit = async(e) => {
		e.preventDefault();
		await signup(input);
		toast.success('Signup successfull')
		setInput(initialFormData)
		
	}
	
	const hanCheckBox = (gender) => {
		setInput({...input , gender})
	}
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500"> Kaiser Chat</span>
        </h1>

        <form onSubmit={hanSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Ex: (John Doe)"
              className="w-full input input-bordered  h-10"
			  value={input.fullName}
			  onChange={(e) => setInput({...input , fullName : e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Ex:(johndoe)"
              className="w-full input input-bordered h-10"
			  value={input.userName}
			  onChange={(e) => setInput({...input , userName : e.target.value})}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
			  value={input.password}
			  onChange={(e) => setInput({...input , password : e.target.value})}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
			  value={input.confirmPassword}
			  onChange={(e)=> setInput({...input , confirmPassword : e.target.value})}
            />
          </div>
          <GenderCheckBox onChangeCheckBox={hanCheckBox} selectedGender={input.gender} />
          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account? Login
          </Link>

          <div>
            <button className="btn btn-primary btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Signup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
