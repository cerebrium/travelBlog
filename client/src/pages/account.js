import React from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import '../components/layout.css'
import axios from 'axios'

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <div>
      <nav className="navBar">
        <Link to="/account/" className='myLinks'>Home</Link>{' | '}
        <Link to="/foods/" className='myLinks'>Places</Link>{' | '}
        <Link to="/places/" className='myLinks'>Foods</Link>{' | '}
        <a href="#logout" className='myLinks' onClick={e => {
          e.preventDefault()
          logout()
          }}
        >
          Log Out
        </a>
      </nav>
      <div className='mainDiv'>
        <h1>Travel Foodie Express</h1>
      </div>
    </div>
  )
}

export default Account