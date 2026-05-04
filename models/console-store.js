'use strict';

import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import JsonStore from './json-store.js';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const consoleStore = {
  store: new JsonStore('./models/console-store.json', { consoleCollection: [] }),
  collection: 'consoleCollection',

  getAllCollections() {
    return this.store.findAll(this.collection);
  },

  getUserCollections(userid) {
    return this.store.findBy(this.collection, (c) => c.userid === userid);
  },

  getCollection(id) {
    return this.store.findOneBy(this.collection, (c) => c.id === id);
  },

  async addCollection(collection, imageFile) {
    collection.id = uuidv4();
    collection.consoles = [];
    if (imageFile) {
      const result = await cloudinary.v2.uploader.upload(imageFile.tempFilePath);
      collection.img = result.url;
    } else {
      collection.img = '';
    }
    await this.store.addCollection(this.collection, collection);
    return collection;
  },

  async removeCollection(id) {
    const collection = this.getCollection(id);
    await this.store.removeCollection(this.collection, collection);
  },

  async addConsole(collectionId, consoleItem) {
    consoleItem.id = uuidv4();
    await this.store.addItem(this.collection, collectionId, 'consoles', consoleItem);
    return consoleItem;
  },

  async removeConsole(collectionId, consoleId) {
    await this.store.removeItem(this.collection, collectionId, 'consoles', consoleId);
  },

  async editConsole(collectionId, consoleId, updatedConsole) {
    await this.store.editItem(this.collection, collectionId, consoleId, 'consoles', updatedConsole);
  },

  searchCollections(userid, searchTerm) {
    const userCollections = this.getUserCollections(userid);
    return userCollections.filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
  },
};

export default consoleStore;
