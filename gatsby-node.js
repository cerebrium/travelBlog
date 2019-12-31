// src/pages/account.js
import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
  
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/account/)) {
      page.matchPath = "/account/*"
  
      // Update the page.
      createPage(page)
    }
  }


const Account = () => (
  <>
    <nav>
      <Link to="/account">Home</Link>{" "}
      <Link to="/account/settings">Settings</Link>{" "}
      <Link to="/account/billing">Billing</Link>{" "}
    </nav>
    <Router>
      <Home path="/account" />
      <Settings path="/account/settings" />
      <Billing path="/account/billing" />
    </Router>
  </>
)

export default Account