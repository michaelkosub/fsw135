import React from 'react'

export default function Comment(props){
  const { comment, _id } = props
  return (
    <div className="todo">
      <h1>{ comment }</h1>
    </div>
  )
}
