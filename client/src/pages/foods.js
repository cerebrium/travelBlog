import React from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import '../components/layout.css'

const Foods = () => {
  const data = useStaticQuery(graphql`
  query {
    secondFileName: file(relativePath: { eq: "malaysiaBeer.png" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fileName: file(relativePath: { eq: "beachBeer.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ThirdFileName: file(relativePath: { eq: "chickenInHanoi.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 500, quality: 100) {
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
        <h1>Foods</h1>
        <div className='foodContent'>
          <div className='imageStylerTwo aligner'>
            <h3>
              When we were in Malaysia we went to the local beer market and got beer 
              that was made that day. This was one of the beers, and it was delicious. It was also
              questionably brewed!
            </h3>
            <Img fluid={data.secondFileName.childImageSharp.fluid} alt="../images/malaysiaBeer.png"/>
          </div>
          <div className='imageStylerFour aligner'>
            <h3>
              After Malaysia we went to Indonesia. In Indonesia we went to Bali and drank lots of
              espresso on the beach! The coffee in most of Asia we found to be extremely sweet, so we stuck mostly
              to the espresso.
            </h3>
            <Img fluid={data.fileName.childImageSharp.fluid} alt="../images/beachBeer.jpg" />
          </div>
          <div className='imageStylerFour aligner'>
            <h3>
              In Hanoi I got this chicken, which was amazing. The rice was the cool part though, it came in this block
              shape and was the crispy rice. Super yummy, the the sauce on the chicken was a type of plumb sauce that was also delicious.
            </h3>
            <Img fluid={data.ThirdFileName.childImageSharp.fluid} objectFit="cover" alt="../images/beachBeer.jpg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Foods