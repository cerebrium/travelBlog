import React, { useState, useEffect } from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import axios from 'axios'
import '../components/layout.css'


const Asia = () => {
  const [currUser, setCurrUser] = useState(null);
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.post('/api/comment/currcomments', {name: 'asia'}).then( response => {
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
      name: 'asia',
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
        <h1>Asia Trip</h1>
        <h3 className='myTextClass'>In our asia trip, we vistited: Vietnam, Indonesia, and Malaysia. We spent time in 
          Hanoi and Saigon when we were in Vietnam. We then went to Halong bay... which was amazing. After cruising through Halong bay 
          we then went to Malaysia. Unfortunetly I was quite sick there and couldn't really handle life too much. But I recovered in 
          time to head to the Komodo Islands. This was an amazing part of the trip. Absolutely shockingly pretty country, with large lizards 
          that were friendlier than you would think!
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

export default Asia