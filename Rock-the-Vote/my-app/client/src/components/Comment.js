import React from 'react'

export default function Comment(props){
  const { comment, _id } = props
  return (
    <div className="">
      <h1>{ _id }</h1>
      <h3>{ comment }</h3>
    </div>
  )
}