import React from 'react'
import { Link} from 'react-router-dom'; 

const Navbar = () => {
  return (
    <div>
         <div className="header">
        <div className="heading">
          <h3>Privacy Id Vault</h3>
        </div>

        <div className="list-items">
          <ul>
            <li><Link className='link' to="/registration">Registration</Link></li>
            <li><Link className='link' to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar