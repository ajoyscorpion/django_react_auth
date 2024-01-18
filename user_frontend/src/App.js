
import './App.css';
import React, { useEffect, useState } from 'react';
import lady from "./Images/signinlady.png"
import logoutlady from "./Images/logout lady.png"


function App() {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState("");
  const[isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect (() =>{
    getSession();
  },[]);

  const getSession = () =>{
    fetch('/api/session/',{
      credentials:"same-origin"
    })
    .then((res)=>res.json())
    .then((data)=>{
      setIsAuthenticated(data.isAuthenticated)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const whoami = () =>{
    fetch('/api/whoami/',{
      credentials:"same-origin",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log("You are logged in as: " + data.username);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handlePasswordChange = (event) =>{
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const login = (event) => {
    event.preventDefault();
    fetch('/api/login/',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "X-CSRFToken":document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,"$1")
      },
      credentials:"same-origin",
      body:JSON.stringify({username,password})
    })
    .then((res)=>{
      if(res.ok){
        setIsAuthenticated(true);
        setUsername("")
        setPassword("")
        setError("")
      }else{
        throw new Error("Wrong Username or Password")
      }
    })
    .catch((err)=>{
      console.log(err);
      setError("Wrong Username or Password")
    })
  }

  const logout = () =>{
    fetch("/api/logout/",{
      credentials:"same-origin"
    })
    .then((res)=>{
      if (res.ok) {
        setIsAuthenticated(false)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="background">
      {isAuthenticated ? (
         <>
          <div className='row'>
            <div className='image col-12 col-sm-6 col-lg-6'>
              <img src={logoutlady} alt="sign in lady"></img>
            </div>
            <div className='col-12 col-sm-6 col-lg-4 d-flex flex-column align-items-center justify-content-center'>
              <h3> You are logged in {username} !</h3>
              <button className='btn btn-primary mt-2' onClick={whoami}>Who am I</button>
              <button className='btn btn-danger mt-2 ms-2' onClick={logout}>Log out</button>
            </div>
          </div>  
        </>
      ):(
        <>
          <div className='row'>
            <div className='image col-12 col-sm-6 col-lg-6'>
              <img src={lady} alt="sign in lady"></img>
            </div>
            <div className='col-12 col-sm-6 col-lg-4 d-flex flex-column justify-content-center'>
              <h2 className='d-flex justify-content-center'>Sign In</h2>
              <form onSubmit={login}>
                <div className='form-group mt-4'>
                  <label htmlFor='username'>
                    <strong>Username</strong>
                  </label>
                  <input 
                    type="text"
                    className="form-control rounded-pill"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {error && <small className='text-danger'>{error}</small>}
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Log In</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
