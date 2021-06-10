const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

//Get All

issueRouter.get('/', (req, res, next) => {
  Issue.find((err, rockthevote) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(rockthevote)
  })
})

//Get One

issueRouter.get('/:issueId', (req, res, next) => {
  Issue.findOne({_id: req.params.issueId}, (err, issue)=> {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

//Post

issueRouter.post('/', (req, res, next)=> {
  req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

//Update

issueRouter.put('/:issueId', (req, res, next)=>{
  Issue.findOneAndUpdate(
    {_id: req.params.issueId}, 
    req.body,
    {new: true}, 
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
  })
})

//Delete
issueRouter.delete('/:issueId', (req, res, next)=> {
  Issue.findOneAndDelete({_id: req.params.issueId}, (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted ${deletedItem.topic} from the database!`)
    }
  )
})



module.exports = issueRouter