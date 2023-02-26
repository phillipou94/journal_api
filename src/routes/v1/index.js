const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const promptRoute = require('./prompt.route');
const answerRoute = require('./answer.route');
const journalRoute = require('./journal.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/prompts',
    route: promptRoute,
  },
  {
    path: '/answers',
    route: answerRoute,
  },
  {
    path: '/journal',
    route: journalRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
