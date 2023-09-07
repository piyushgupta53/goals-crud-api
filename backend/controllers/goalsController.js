const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal');
const User = require('../models/user');


// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals);
});

// @desc Set goal
// @route POST /api/goals
// @access Private

const setGoals = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field!');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
});

// @desc Update goal
// @route PUT /api/goals
// @access Private

const updateGoal = asyncHandler(async(req, res) => {
    // Check if a goal exists
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    
    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check if goal's user ID matches logged in user's ID
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal)
});

// @desc Delete goal
// @route DELETE /api/goals
// @access Private

const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    
    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check if goal's user ID matches logged in user's ID
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await goal.deleteOne();
    res.status(200).json({id: req.params.id})
});

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
};
