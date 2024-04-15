const express = require('express');
const router = express.Router();
const {list, detail, create, destroy} = require('../../controllers/api/moviesApiController');

router
.get('/', list)
.get('/:id', detail)
.post('/create', create)
.delete('/delete/:id', destroy)

module.exports = router;