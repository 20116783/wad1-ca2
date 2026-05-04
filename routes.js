'use strict';

import express from 'express';
import accounts from './controllers/accounts.js';
import dashboard from './controllers/dashboard.js';
import consoleDetails from './controllers/console-details.js';
import about from './controllers/about.js';
import stats from './controllers/stats.js';

const router = express.Router();

// Auth
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/logout', accounts.logout);

// Dashboard
router.get('/dashboard', dashboard.createView);
router.post('/dashboard/addcollection', dashboard.addCollection);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.post('/dashboard/search', dashboard.searchCollections);

// Console details
router.get('/collection/:id', consoleDetails.createView);
router.post('/collection/:id/addconsole', consoleDetails.addConsole);
router.get('/collection/:id/deleteconsole/:consoleId', consoleDetails.deleteConsole);
router.post('/collection/:id/updateconsole/:consoleId', consoleDetails.updateConsole);

// Other pages
router.get('/stats', stats.createView);
router.get('/about', about.createView);

export default router;
