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
const { validateContact, validateBody, validateStatus, validateId } = require('./validationContact');
const guard = require('../../helpers/guard');

router.get('/', guard, getContacts )

router.get('/:contactId', guard, validateId, getContactById )

router.post('/', guard, validateContact, createContact )

router.delete('/:contactId', guard, validateId, deleteContact )

router.put('/:contactId', guard, validateId, validateBody, updateContact )

router.patch('/:contactId/favorite/', guard, validateId, validateStatus, updateStatusContact )


module.exports = router
