'use strict';

import logger from '../utils/logger.js';
import consoleStore from '../models/console-store.js';
import accounts from './accounts.js';

const dashboard = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (!loggedInUser) {
      response.redirect('/');
      return;
    }
    logger.info('Dashboard loading!');
    let collections = consoleStore.getUserCollections(loggedInUser.id);
    const sort = request.query.sort;
    if (sort === 'az') collections = collections.slice().sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') collections = collections.slice().sort((a, b) => b.title.localeCompare(a.title));
    const viewData = {
      title: 'Manufacturer Dashboard',
      collections,
      sort,
    };
    response.render('dashboard', viewData);
  },

  async addCollection(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (!loggedInUser) {
      response.redirect('/');
      return;
    }
    const imageFile = request.files && request.files.image ? request.files.image : null;
    const collection = {
      userid: loggedInUser.id,
      title: request.body.title,
      description: request.body.description,
    };
    await consoleStore.addCollection(collection, imageFile);
    logger.info(`Added collection: ${collection.title}`);
    response.redirect('/dashboard');
  },

  async deleteCollection(request, response) {
    const id = request.params.id;
    await consoleStore.removeCollection(id);
    logger.info(`Deleted collection: ${id}`);
    response.redirect('/dashboard');
  },

  async searchCollections(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (!loggedInUser) {
      response.redirect('/');
      return;
    }
    const searchTerm = request.body.search || '';
    const results = consoleStore.searchCollections(loggedInUser.id, searchTerm);
    const viewData = {
      title: 'Manufacturer Dashboard',
      collections: results,
      searchTerm: searchTerm,
    };
    response.render('dashboard', viewData);
  },
};

export default dashboard;
