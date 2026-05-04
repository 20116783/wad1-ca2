'use strict';

import logger from '../utils/logger.js';
import consoleStore from '../models/console-store.js';
import userStore from '../models/user-store.js';
import accounts from './accounts.js';

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (!loggedInUser) {
      response.redirect('/');
      return;
    }
    logger.info('Stats page loading');

    // Per-user stats
    const collections = consoleStore.getUserCollections(loggedInUser.id);
    const totalCollections = collections.length;
    const consoleCounts = collections.map((c) => c.consoles.length);
    const totalConsoles = consoleCounts.reduce((sum, n) => sum + n, 0);
    const avgConsoles = totalCollections > 0 ? (totalConsoles / totalCollections).toFixed(1) : 0;
    const maxConsoles = totalCollections > 0 ? Math.max(...consoleCounts) : 0;
    const minConsoles = totalCollections > 0 ? Math.min(...consoleCounts) : 0;

    // App-wide stats
    const allCollections = consoleStore.getAllCollections();
    const totalUsers = userStore.getAllUsers().length;
    const appTotalConsoles = allCollections.reduce((sum, c) => sum + c.consoles.length, 0);

    const viewData = {
      title: 'Statistics',
      totalCollections,
      totalConsoles,
      avgConsoles,
      maxConsoles,
      minConsoles,
      totalUsers,
      appTotalConsoles,
    };
    response.render('stats', viewData);
  },
};

export default stats;
