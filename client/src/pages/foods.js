import React from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link, useStaticQuery, graphql } from "gatsby"
import axios from 'axios'
import Img from 'gatsby-image'
import '../components/layout.css'

const Foods = () => {
  const data = useStaticQuery(graphql`
  query {
    secondFileName: file(relativePath: { eq: "malaysiaBeer.png" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fileName: file(relativePath: { eq: "beachBeer.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
    `)
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }


  return (
    <div>
      {/* nav bar */}
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

      {/* main content */}
      <div className='mainDiv'>
        <h1>Foods</h1><br />
        <div className='foodContent'>
          <div className='imageStyler aligner'>
            <h3>
              When we were in Malaysia we went to the local beer market and got beer 
              that was made that day. This was one of the beers, and it was delicious
            </h3>
            <Img fluid={data.secondFileName.childImageSharp.fluid} alt="../images/malaysiaBeer.png"/>
          </div>
          <div className='imageStyler aligner'>
            <h3>
              Along with the beer in Malaysia, In Bali we also had beach bear with espresso!
            </h3>
            <Img fluid={data.fileName.childImageSharp.fluid} alt="../images/beachBeer.jpg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Foods