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
const { validateContact, validateBody, validateStatus, validateId } = require('./validation');

router.get('/', getContacts )

router.get('/:contactId', validateId, getContactById )

router.post('/', validateContact, createContact )

router.delete('/:contactId', validateId, deleteContact )

router.put('/:contactId',  validateId, validateBody, updateContact )

router.patch('/:contactId/favorite/', validateId, validateStatus, updateStatusContact )


module.exports = router
