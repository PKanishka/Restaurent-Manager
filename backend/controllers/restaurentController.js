const asyncHandler = require('express-async-handler')

const Restaurent = require('../models/restaurentModel')
const User = require('../models/userModel')

// @desc Get restaurents
// @route GET /api/restaurents
// @access Private
const getRestaurents = asyncHandler(async (req, res) => {
    const restaurents = await Restaurent.find({user: req.user.id})

    res.status(200).json(restaurents)
})

// @desc Set restaurent
// @route POST /api/restaurents
// @access Private
const setRestaurent = asyncHandler(async (req, res) => {
    const { name, address, telephone} = req.body
    if(!name || !address || !telephone){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const restaurent = await Restaurent.create({
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        user: req.user.id
    })

    res.status(200).json(restaurent)
})

// @desc Update restaurent
// @route PUT /api/restaurents/:id
// @access Private
const updateRestaurent = asyncHandler(async (req, res) => {
    const restaurent = await Restaurent.findById(req.params.id)

    if(!restaurent){
        res.status(400)
        throw new Error('Restaurent not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    // make sure the logged in user matches the restaurent user
    if(restaurent.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedRestaurent = await Restaurent.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    res.status(200).json(updatedRestaurent)
})

// @desc DELETE restaurents
// @route DELETE /api/restaurents/:id
// @access Private
const deleteRestaurent = asyncHandler(async (req, res) => {
    const restaurent = await Restaurent.findById(req.params.id)

    if(!restaurent){
        res.status(400)
        throw new Error('Restaurent not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    // make sure the logged in user matches the restaurent user
    if(restaurent.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await restaurent.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getRestaurents,
    setRestaurent,
    updateRestaurent,
    deleteRestaurent,
}