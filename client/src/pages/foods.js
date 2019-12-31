import React from "react"
import { login, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import axios from 'axios'

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Foods = () => {
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
      </nav>
      <h1>Travel Foodie Express</h1>
      <h3>foods page</h3>
    </div>
  )
}

export default Foods