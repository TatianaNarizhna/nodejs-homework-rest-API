const express = require('express');
const router = express.Router();
const { 
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact 
} = require('../../controllers/contactsController');
const { validateContact, validateBody, validateStatus, validateId } = require('./validationContact');
const guard = require('../../helpers/guard');
const wrapperErr = require('../../helpers/errorHandler');

router.get('/', guard, wrapperErr(getContacts))

router.get('/:contactId', guard, validateId, wrapperErr(getContactById))

router.post('/', guard, validateContact, wrapperErr(createContact))

router.delete('/:contactId', guard, validateId, wrapperErr(deleteContact))

router.put('/:contactId', guard, validateId, validateBody, wrapperErr(updateContact))

router.patch('/:contactId/favorite/', guard, validateId, validateStatus, wrapperErr(updateStatusContact))


module.exports = router;
