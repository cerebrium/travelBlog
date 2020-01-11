import React, { useState, useEffect } from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import axios from 'axios'
import '../components/layout.css'


const Leavenworth = () => {
  //Graphql Images
  const data = useStaticQuery(graphql`
    query {
      secondFileName: file(relativePath: { eq: "leavenworthPretty.JPG"}) {
        childImageSharp {
          fluid(maxWidth: 500, maxHeight: 300, quality: 100) {
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
    axios.post('/api/comment/currcomments', {name: 'leavenworth'}).then( response => {
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
      name: 'leavenworth',
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
        <h1>Leavenworth Trip</h1>
        <div className='imageStylerTwo aligner'>
          <h3 className='myTextClass'>Leavenworth is a rather special place for us. We usually go every year around Christmas. It is a little mock German village 
          in Eastern Washington. The pretzels are amazing, and the snow is really fun to play around in. We usually go to bed and breakfasts and we have found some really nice
          ones over the years. 
          </h3>
          <Img fluid={data.secondFileName.childImageSharp.fluid} alt="../images/ginishkaDragon.png"/> 
        </div>
          <h2 className='commentTitle'>Comments</h2>
          <div className='commentsBox'>
            {mappedComments}
          </div>
          <br />
        <h3>Add A Comment:</h3>
          <form onSubmit={handleSubmit} className='myForm'>
            <textarea name="message" cols="30" rows="5"></textarea><br />
            <input type="submit" value="submit" className='submitButton'/>
          </form>
          <div className='returnNav'>  
          <Link to='/places/' className='myLinks'><h3>Back to Places</h3></Link>
        </div>
      </div>
    </div>
  )
}

export default Leavenworth