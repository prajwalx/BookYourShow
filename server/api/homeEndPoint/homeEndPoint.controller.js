/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/homeEndPoints              ->  index
 * POST    /api/homeEndPoints              ->  create
 * GET     /api/homeEndPoints/:id          ->  show
 * PUT     /api/homeEndPoints/:id          ->  update
 * DELETE  /api/homeEndPoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import HomeEndPoint from './homeEndPoint.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
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

// Gets a list of HomeEndPoints
export function index(req, res) {
  return HomeEndPoint.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single HomeEndPoint from the DB
export function show(req, res) {
  return HomeEndPoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new HomeEndPoint in the DB
export function create(req, res) {
  return HomeEndPoint.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing HomeEndPoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return HomeEndPoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a HomeEndPoint from the DB
export function destroy(req, res) {
  return HomeEndPoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
