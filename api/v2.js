'use strict';

const cwd = process.cwd();

const express = require('express');
const bearer = require('../auth/middleware/bearer.js');
const modelFinder = require(`../middelware/model-finder.js`);
const can = require('../auth/middleware/acl.js');

const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder.load);

// Models List
router.get('/models', (request, response) => {

  modelFinder.list()
    .then(models => response.status(200).json(models));
});

// JSON Schema
router.get('/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

router.get('/:model', bearer, can('read'), handleGetAll);
router.post('/:model', bearer, can('create'), handlePost);
router.get('/:model/:id', bearer, can('read'), handleGetOne);
router.put('/:model/:id', bearer, can('update'), handlePut);
router.delete('/:model/:id', bearer, can('delete'), handleDelete);

// Route Handlers
async function handleGetAll(request, response, next) {
  try{
    let result = await request.model.get(request.query);
        const output = {
          count: result.length,
          results: result,
        };
        response.status(200).json(output);
      }
  catch(e) {
      next('No Read Permissions');
    }
}

async function handleGetOne(request, response, next) {
  try {
    let result = await request.model.get({ _id: request.params.id })
      response.status(200).json(result[0]);
    }
  catch(e) {
      next('No Read Permissions');
    }
}

async function handlePost(request, response, next) {
  try {
    let result = await request.model.create(request.body)
      response.status(200).json(result);
    }
  catch(e){
      next('No Create Permissions');
    }
}

async function handlePut(request, response, next) {
  try {
    let result = await request.model.update(request.params.id, request.body)
      response.status(200).json(result);
    }
  catch(e){
      next('NO Update Permissions');
    }
}


async function handleDelete(request, response, next) {
  try {
    let result = await request.model.delete(request.params.id)
      response.status(200).json(result);
    }
  catch(e){
      next('No Delete Permissions');
    }
}

module.exports = router;