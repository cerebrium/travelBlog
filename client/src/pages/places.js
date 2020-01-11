import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { login, logout, isAuthenticated} from "../utils/auth"
import Img from 'gatsby-image'
import '../components/layout.css'


const Places = () => {
  const data = useStaticQuery(graphql`
  query {
    secondFileName: file(relativePath: { eq: "leavenworth.png" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fileName: file(relativePath: { eq: "ginishkaDragon.png" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 300, quality: 100) {
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
    <>
      <nav className="navBar">
        <Link to="/account" className='myLinks'>Home</Link>{' | '}
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
      <div className='mainDivTwo'>
        <h1 className='placesTitle'>Places</h1>
        <div className='placesImages'>
          <div className='imageStyler aligner'>
            <h2 className='asiaTag'>Asia</h2>
            <Link to='/asia/'><Img fluid={data.fileName.childImageSharp.fluid} alt="../images/ginishkaDragon.png"/></Link>
          </div>
          <div className='imageStyler aligner'>
            <h2 className='asiaTag'>Leavenworth</h2>
            <Link to='/leavenworth/'><Img fluid={data.secondFileName.childImageSharp.fluid} alt="../images/leavenworth.png"/></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Places;