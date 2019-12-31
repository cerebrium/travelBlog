// ./src/pages/index.js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <h1>Welcome to Tavel Foodie Express!</h1>
    <button><Link to="/account">Go to your account</Link></button>
  </div>
)