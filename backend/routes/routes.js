const calculation = require("../calculation");

module.exports = app => {
  const router = require('express').Router();

  router.post('/calculation', (req, res) =>
    calculation(req.body).then(result => res.send(result)));

  app.use('/api', router);
};