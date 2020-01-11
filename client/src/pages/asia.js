import React, { useState, useEffect } from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import axios from 'axios'
import '../components/layout.css'


const Asia = () => {
  // Graphql images
  const data = useStaticQuery(graphql`
  query {
    secondFileName: file(relativePath: { eq: "espressoAndDrink.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fileName: file(relativePath: { eq: "sushi.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 500, maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
    `)

    // State
  const [currUser, setCurrUser] = useState(null);
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.post('/api/comment/currcomments', {name: 'asia'}).then( response => {
      if (comments.length > 1) {
        var myComments = [...comments]
        myComments.push(response.data)
        setComments(myComments)
      } else {
        setComments(response.data)
      }
    })
  }, [])

    // check to see if the person has logged in yet
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  if (!currUser) {
    setCurrUser(user)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/comment/add', {
      message: event.target.message.value,
      name: 'asia',
      email: user.email,
      userName: user.given_name
    }).then(response => {
      if (comments.length > 1) {
        var myComments = [...comments]
        myComments.push(response.data)
        setComments(myComments)
      } else {
        setComments(response.data)
      }
    })
    event.target.message.value = ''
  }

  var mappedComments;
  if (comments.length > 0) {
    mappedComments = comments.map((ele, id) => <p key={id} className='comments'><span className='names'>{ele.name}</span>:<br />{ele.comment}</p>)
  } else {
    mappedComments = ('')
  }

  return (
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
        <h1>Asia Trip</h1>
        <div className='imageStylerTwo aligner'>
          <h3 className='myTextClass'>In our asia trip, we vistited: Vietnam, Indonesia, and Malaysia. We spent time in 
            Hanoi and Saigon when we were in Vietnam. We then went to Halong bay... which was amazing. After cruising through Halong bay 
            we then went to Malaysia. Unfortunetly I was quite sick there and couldn't really handle life too much. But I recovered in 
            time to head to the Komodo Islands. This was an amazing part of the trip. Absolutely shockingly pretty country, with large lizards 
            that were friendlier than you would think!
          </h3>
            <Img fluid={data.secondFileName.childImageSharp.fluid} alt="../images/espressoAndDrink.jpg"/>
          <h3>
            I absolutely fell in love with the juices they served in Bali. This one here was one of the Best. The juices came 
            from the freshest of ingredients and were always refreshing in the heat.
          </h3>
        </div>
        <div className='imageStylerTwo aligner'>
          <Img fluid={data.fileName.childImageSharp.fluid} alt="../images/sushi.jpg" />
          <h3>
            Along with the drinks the food was absolutely amazing. My favorite was the chicken satay, but at this restuarant the 
            styling of these paticular sushi interested me.
          </h3>
        </div>
          <h2 className='commentTitle'>Comments</h2>
          <div className='commentsBox'>
            {mappedComments}
          </div>
          <br />
        <h3>Add A Comment:</h3>
          <form onSubmit={handleSubmit} className='myForm'>
            <textarea name="message" cols="10" rows="10"></textarea><br />
            <input type="submit" value="submit" className='submitButton'/>
          </form>
          <div className='returnNav'>  
          <Link to='/places/' className='myLinks'><h3>Back to Places</h3></Link>
        </div>
      </div>
    </div>
  )
}

export default Asia