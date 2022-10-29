const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee');

// Get, Post, Put, Delete
// Base path: http://localhost:3000/employees

// Get API
router.get('/', (req, res) => {
    Employee.find((err, doc) => {
        if (err) {
            console.log('Error in getting data: ' + err);
        } else {
            res.send(doc);
        }
    });
});

// Get Single Employee API
router.get('/:id', (req, res) => {
    if (isValidObjectId(req.params.id)) {
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in getting employee by id: ' + err);
            } else {
                res.send(doc);
            }
        })
    } else {
        return res.status(400).send('No record found with id:' + req.params.id);
    }

});

// Post API
router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept,
    });

    emp.save((err, doc) => {
        if (err) {
            console.log('Error in post: ' + err);
        } else {
            console.log('employee details saved:');
            console.log(emp);
            res.send(doc);
        }
    });
});

// Put API
router.put('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        // let emp = {
        //     name: req.body.name,
        //     position: req.body.position,
        //     dept: req.body.dept,
        // };
        const emp = req.body;
        console.log(emp);
        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
            if (err) {
                console.log('Error in updating employee by id: ' + err);
            } else {
                res.send(doc);
            }
        })
    } else {
        return res.status(400).send('No record found with id:' + req.params.id);
    }

});

// Delete API
router.delete('/:id', (req, res) => {
    if (isValidObjectId(req.params.id)) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in deleting employee by id: ' + err);
            } else {
                res.send(doc);
            }
        })
    } else {
        return res.status(400).send('No record found with id:' + req.params.id);
    }

});

module.exports = router;