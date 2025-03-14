var express = require('express');
var router = express.Router();
let categorySchema = require('../schema/category');

router.get('/', async function(req, res, next) {
    let category = await categorySchema.find({
        isDeleted: false
    })
    res.send(category);
});

router.get("/:id", async function(req, res, next) {
    try {
        const category = await categorySchema.findById(req.params.id);
        if (!category || category.isDeleted) {
            res.status(404).send('Không tìm thấy danh mục.');
        }
        res.send(category);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/', async function(req, res, next) {
    try{
        const { name, description } = req.body;
        if (!name) {
            res.status(400).send('Tên danh mục không được để trống.');
        }
        else if (!description) {
            res.status(400).send('Mô tả danh mục không được để trống.');
        }

        let newCategory = categorySchema({
            name: name,
            description: description
        })

        await newCategory.save();
        res.status(201).send({
            success: true,
            data: newCategory
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const { name, description } = req.body;

        let category = await categorySchema.findById(req.params.id);
        if (!category) {
            res.status(404).send('Không tìm thấy danh mục.');
        }

        if (name) {
            category.name = name;
        }
        if (description) {
            category.description = description;
        }
        await category.save();
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
})

router.delete('/:id', async function(req, res, next) {
    try {
        const category = await categorySchema.findById(req.params.id);
        if (!category || category.isDeleted) {
            res.status(404).send('Không tìm thấy danh mục.');
        }

        category.isDeleted = true;
        await category.save();
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;