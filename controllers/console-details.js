'use strict';

import logger from '../utils/logger.js';
import consoleStore from '../models/console-store.js';
import accounts from './accounts.js';

const consoleDetails = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (!loggedInUser) {
      response.redirect('/');
      return;
    }
    const collectionId = request.params.id;
    logger.info('Details page loading for collection: ' + collectionId);
    const viewData = {
      title: 'Console Details',
      collection: consoleStore.getCollection(collectionId),
    };
    response.render('console-details', viewData);
  },

  async addConsole(request, response) {
    const collectionId = request.params.id;
    const newConsole = {
      name: request.body.name,
      year: request.body.year,
      type: request.body.type,
      game: request.body.game,
    };
    await consoleStore.addConsole(collectionId, newConsole);
    logger.info(`Added console: ${newConsole.name}`);
    response.redirect('/collection/' + collectionId);
  },

  async deleteConsole(request, response) {
    const collectionId = request.params.id;
    const consoleId = request.params.consoleId;
    await consoleStore.removeConsole(collectionId, consoleId);
    logger.info(`Deleted console: ${consoleId}`);
    response.redirect('/collection/' + collectionId);
  },

  async updateConsole(request, response) {
    const collectionId = request.params.id;
    const consoleId = request.params.consoleId;
    const updatedConsole = {
      id: consoleId,
      name: request.body.name,
      year: request.body.year,
      type: request.body.type,
      game: request.body.game,
    };
    await consoleStore.editConsole(collectionId, consoleId, updatedConsole);
    logger.info(`Updated console: ${consoleId}`);
    response.redirect('/collection/' + collectionId);
  },
};

export default consoleDetails;
