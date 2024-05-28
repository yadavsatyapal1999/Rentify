const express = require('express');
const propertyRouter = express.Router()
const Property = require("../Schema/propertySchema")

const auth = require("../Auth/auth")
// Create a new property
propertyRouter.post('/new', auth, async (req, res) => {
    try {
        const property = new Property({
            ...req.body,
            postedBy: req.userId
        });
        await property.save();
        res.status(201).send(property);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});


// Get all properties
propertyRouter.get('/get', async (req, res) => {
console.log("get")

    try {
        const properties = await Property.find();
        res.status(200).send(properties);
       // console.log(properties)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// Update a property
propertyRouter.patch('/up/:id',auth, async (req, res) => {
    console.log("update")
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body,{new:true});

        if (!property) {
            return res.status(404).send("id not found");
        }

        res.status(200).send(property);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a property
propertyRouter.delete('/del/:id',auth, async (req, res) => {
    console.log("delete");
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).send("id not found");
        }

        res.status(200).send(property);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = propertyRouter;