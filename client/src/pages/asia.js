import React from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"

const Asia = () => {
    // check to see if the person has logged in yet
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <div>
      <div className='mainDiv'>
        <h1>Asia Trip</h1>
        <div className='returnNav'>
          <Link to='/places/' className='myLinks'><h3>Places</h3></Link>
        </div>
      </div>
    </div>
  )
}

export default Asia