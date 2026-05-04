'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';

const accounts = {
  index(request, response) {
    response.render('index');
  },

  login(request, response) {
    response.render('login');
  },

  signup(request, response) {
    response.render('signup');
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    logger.info(`Registered new user: ${user.email}`);
    response.redirect('/');
  },

  async authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('consolearchive', user.email);
      logger.info(`Logging in: ${user.email}`);
      response.redirect('/dashboard');
    } else {
      logger.info('Login failed - invalid credentials');
      response.redirect('/login');
    }
  },

  logout(request, response) {
    response.clearCookie('consolearchive');
    logger.info('User logged out');
    response.redirect('/');
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.consolearchive;
    return userStore.getUserByEmail(userEmail);
  },
};

export default accounts;
