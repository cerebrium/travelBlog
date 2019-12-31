
import React from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
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
        <Link to="/account/">home</Link>{' | '}
        <Link to="/foods/">Places</Link>{' | '}
        <Link to="/places/">Foods</Link>{' | '}
        <a href="#logout" onClick={e => {
          e.preventDefault()
          logout()
          }}
        >
          Log Out
        </a>
      </nav>
      <h1>Travel Foodie Express</h1>
    </div>
  )
}

export default Account