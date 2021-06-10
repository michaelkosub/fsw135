const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory')

// GET ALL

inventoryRouter.get("/", (req, res, next) => {
    Inventory.find( (err, inventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})



inventoryRouter.get('/:inventoryId', (req, res, next) => {
    Inventory.find({_id: req.params.inventoryId}, (err, inventoryUnit) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.send(inventoryUnit)
    })
  })



inventoryRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedInventory)
    })
  })

 

  inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
      { _id: req.params.inventoryId},
      req.body,
      {new: true}, 
      (err, updatedInventory) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedInventory)
      }
    )  
  })



  inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
      {_id: req.params.inventoryId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.name} from the database!`)
      }
    )
  })

  module.exports = inventoryRouter