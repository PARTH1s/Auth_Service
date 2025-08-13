const express = require('express');
const v1ApiRoutes = require('./v1/index');

const router = express.Router();

// Prefix all v1 routes with /v1
router.use('/v1', v1ApiRoutes);

module.exports = router;
