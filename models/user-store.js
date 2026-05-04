'use strict';

import { v4 as uuidv4 } from 'uuid';
import JsonStore from './json-store.js';

const userStore = {
  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, (user) => user.id === id);
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user) => user.email === email);
  },

  async addUser(user) {
    user.id = uuidv4();
    await this.store.addCollection(this.collection, user);
    return user;
  },
};

export default userStore;
