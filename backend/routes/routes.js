const express = require('express');
const router = express.Router();
const { 
  createSheet, 
  getSheets, 
  updateSheet, 
  deleteSheet 
} = require('../controller/control');

router.post('/', createSheet);
router.get('/:userId', getSheets);
router.put('/:id', updateSheet);
router.delete('/:id', deleteSheet);

module.exports = router;