import React, { useState, useEffect} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { useStaticQuery, graphql, Link } from "gatsby"
import '../components/layout.css'
import axios from 'axios'
import Img from 'gatsby-image'

const Account = () => {
  const data = useStaticQuery(graphql`
  query {
    secondFileName: file(relativePath: { eq: "selfie.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `)

  const user = getProfile()
  console.log(user)
  useEffect(() => {
    axios.post('/api/auth/signup', {
      name: user.name, 
      email: user.email 
    }).then( response => {
      console.log(response)
    })
  }, [])
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }
  
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <nav className="navBar">
          <Link to="/account/" className='myLinks'>Home</Link>{' | '}
          <Link to="/foods/" className='myLinks'>Foods</Link>{' | '}
          <Link to="/places/" className='myLinks'>Places</Link>{' | '}
          <a href="#logout" className='myLinks' onClick={e => {
            e.preventDefault()
            logout()
            }}
          >
            Log Out
          </a>
        </nav>
        <div className='mainDiv'>
          <h1>Welcome to my blog!</h1><br />
          <Img fluid={data.secondFileName.childImageSharp.fluid} alt="../images/leavenworth.png" className='firstImage'/>
        </div>
      </div>
    </Layout>
  )
}

export default Account