import React, { useContext } from 'react'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import Comment from './Comment.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    addComment, 
    Comment 
  } = useContext(UserContext)

  return (
    <div className="">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Comment</h3>
      <CommentForm addComment={addComment}/>
      <h3>Your Comments</h3>
      <CommentList Comments={Comments}/>
      
    </div>
  )
}