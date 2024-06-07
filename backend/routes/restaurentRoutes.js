const express = require('express')
const router = express.Router()
const {getRestaurents, setRestaurent, updateRestaurent, deleteRestaurent} = require('../controllers/restaurentController')
const { set } = require('mongoose')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getRestaurents).post(protect, setRestaurent)
router.route('/:id').delete(protect, deleteRestaurent).put(protect, updateRestaurent)

module.exports = router