const express = require('express')
const router = express.Router()
const {mapItems, validator, mapItem} = require('../helpers')

const Model = require('../models/Tag')

const validationRules = {
  "name": "required",
}

router.get('/', async function (req, res) {
  let list = await Model.find({});
  list = mapItems(list, 'tags')
  try {
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.post('/', function (req, res) {
  validator(req.body, validationRules, {}, async (err, status) => {
    if (!status) {
      res.status(422).send({...err.errors});
    } else {
      const {name, parent} = req.body
      await Model.create({name, parent}, function (err, obj) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.sendStatus(200);
        }
      })
    }
  })
})

router.get('/:id', async function (req, res) {
  let record = await Model.findOne({nick: 'noname'});
  record = mapItem(record, 'tags')
  try {
    res.send(record);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.post('/:id', async function (req, res) {
  validator(req.body, validationRules, {}, async (err, status) => {
    if (!status) {
      res.status(422).send({...err.errors});
    } else {
      const {name, parent} = req.body
      await Model.findByIdAndUpdate(req.params.id, {name, parent}, function (err, obj) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.sendStatus(200);
        }
      })
    }
  })
})

router.delete('/:id', async function (req, res) {
  await Model.findByIdAndDelete(req.params.id)
  try {
    res.sendStatus(204);
  } catch (e) {
    res.status(400).send(e);
  }
})


module.exports = router
