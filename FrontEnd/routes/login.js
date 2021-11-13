const express = require('express');
const router = express.Router();
const autent = require('../controllers/autenticacion');

//--------------- INDEX/AUTENTICACION ---------

router.get("/", autent.home);

router.post("/producto", autent.autenticacion);

module.exports = router;