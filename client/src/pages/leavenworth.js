import React, { useState, useEffect } from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import axios from 'axios'

const Leavenworth = () => {
  const [currUser, setCurrUser] = useState(null);
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.post('/api/comment/currcomments', {name: 'leavenworth'}).then( response => {
      console.log(response.data)
      if (comments.length > 1) {
        console.log('in the if comments block')
        var myComments = [...comments]
        myComments.push(response.data)
        setComments(myComments)
      } else {
        console.log('in the else comments block', response.data)
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
        console.log('in the if comments block')
        var myComments = [...comments]
        myComments.push(response.data)
        setComments(myComments)
      } else {
        console.log('in the else comments block')
        setComments(response.data)
      }
    })
    console.log(event.target.message.value)
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
      <div className='mainDiv'>
        <h1>Leavenworth Trip</h1>
        <h3 className='myTextClass'>Leavenworth is a rather special place for us. We usually go every year around Christmas. It is a little mock German village 
        in Eastern Washington. The pretzels are amazing, and the snow is really fun to play around in. We usually go to bed and breakfasts and we have found some really nice
        ones over the years. 
        </h3>
          <h2 className='commentTitle'>Comments</h2>
          <div className='commentsBox'>
            {mappedComments}
          </div>
          <br />
        <h3>Add A Comment:</h3>
          <form onSubmit={handleSubmit} className='myForm'>
            <textarea name="message" cols="30" rows="10"></textarea><br />
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