const express = require('express');
const router = express.Router();
const { 
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact 
} = require('../../controllers/cotactsController');
const { validateContact, validateBody, validateStatus } = require('./validation');

router.get('/', getContacts )

router.get('/:contactId', getContactById )

router.post('/', validateContact, createContact )

router.delete('/:contactId', deleteContact )

router.put('/:contactId', validateBody, updateContact )

router.patch('/:contactId/favorite/', validateStatus, updateStatusContact )


module.exports = router
