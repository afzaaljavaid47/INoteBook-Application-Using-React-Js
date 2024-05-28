import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'

function Navbar() {
const location=useLocation();
const naviger=useNavigate();
const token=localStorage.getItem('token');
console.log("token",token);
const handleLogout=()=>{
  localStorage.removeItem('token');
  naviger('/login')
}
  return (
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
     {!token?<form className="form-inline my-2 my-lg-0">
        <Link className="btn btn-success my-2 my-sm-0 mx-2" to="/login">Login</Link>
        <Link className="btn btn-success my-2 my-sm-0" to="/signup">Signup</Link>
      </form>:<button className='btn btn-primary' onClick={handleLogout}>Log out</button>}
    </div>
  </nav>
  )
}

export default Navbar
