'use strict';

/**
 * travel-package service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::travel-package.travel-package');
