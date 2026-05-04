'use strict';

import appStore from '../models/app-store.js';
import consoleStore from '../models/console-store.js';

const about = {
  createView(request, response) {
    const info = appStore.getAppInfo();
    const allCollections = consoleStore.getAllCollections();
    const totalManufacturers = allCollections.length;
    const totalConsoles = allCollections.reduce((sum, c) => sum + c.consoles.length, 0);
    const lastUpdated = new Date().toLocaleDateString('en-IE', { month: 'long', year: 'numeric' });

    const viewData = {
      title: 'About Console Archive',
      info,
      totalManufacturers,
      totalConsoles,
      lastUpdated,
    };
    response.render('about', viewData);
  },
};

export default about;
