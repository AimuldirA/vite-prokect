import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login(){
    const [userName, setUsername]=useState('');
    const [userPass, setUserPass]=useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleName=(e)=>{
       setUsername(e.target.value);
    }

    const handlePass=(e)=>{
        setUserPass(e.target.value)
    }
    
    const handleLogin=()=>{

        const user=localStorage.getItem(userName);

        if(!user){
            setError("user not found");
            return;
        }                       
        const { userPass: storedPassword } = JSON.parse(user); 

        if (storedPassword !== userPass) {
            setError("Invalid password.");
            return; 
        }

        navigate('/home')
        setUserPass('');
        setError('');
        setUsername('');
    }

    const handleSignup=()=>{

        const existUser=localStorage.getItem(userName);

        if(existUser){
            setError("Username already taken.")
            return;
        }

        localStorage.setItem(userName, JSON.stringify({userName, userPass}));
        alert("Sign up successful!");
        setUserPass('');
        setError('');
        setUsername('');
    }
   

    return(
        <div className="border border-grey-300 rounded-md ">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
            <h1 className="text-2xl font-bold text-blue-700">Login</h1>
            <input 
                type="text"
                placeholder="Username"
                className="border border-grey-300 rounded-xl h-10 w-56 pl-4"
                value={userName}
                onChange={handleName}
            />
            <input
                type="Password"
                placeholder="Password"
                className=" border border-l border-grey-300 rounded-xl h-10 w-56 pl-4"
                value={userPass}
                onChange={handlePass}
            />
            <button className=" bg-blue-600  rounded-xl w-48 h-10 w-56" onClick={()=>handleLogin()}>Log in</button>
            <button className=" text-l font-bold text-blue-700" onClick={handleSignup}>Sign up</button>
            <p className="text-red-500">{error}</p>
        </div>
       </div>
    )
}

export default Login;