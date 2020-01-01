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
        <h1>Leavenworth</h1>
        <Link to='/places/' className='myLinks'>Places</Link>
      </div>
    </div>
  )
}

export default Asia