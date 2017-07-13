/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/moviesendpoints              ->  index
 * POST    /api/moviesendpoints              ->  create
 * GET     /api/moviesendpoints/:id          ->  show
 * PUT     /api/moviesendpoints/:id          ->  update
 * DELETE  /api/moviesendpoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Moviesendpoint from './moviesendpoint.model';

function respondWithResult(res, statusCode) {
  statusCode =(statusCode || 200);
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Moviesendpoints
export function index(req, res) {
  return Moviesendpoint.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Moviesendpoint from the DB
export function show(req, res) {
  return Moviesendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Moviesendpoint in the DB
export function create(req, res) {
  return Moviesendpoint.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Moviesendpoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Moviesendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Moviesendpoint from the DB
export function destroy(req, res) {
  return Moviesendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
