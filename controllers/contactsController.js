const Contacts = require('../dataBase/contacts');
const { CustomError } = require('../helpers/customError');

const getContacts = async (req, res) => {
      const userId = req.user._id;
      const contacts = await Contacts.listContacts(userId);
      res.json({ status: 'success', code: 200, data: { contacts } })
 
  }
  
const getContactById =  async (req, res, next) => {
      const userId = req.user._id;
      const contact = await Contacts.getContactById(req.params.contactId, userId);
      if (contact) {
        return res.status(200).json({ status: 'success', code: 200, data: { contact }})
      }
      throw new CustomError(404, 'Not Found');
  }
  
  const createContact =  async (req, res, next) => {
      const userId = req.user._id;
      const contact = await Contacts.addContact({...req.body, owner: userId});
      res.status(201).json({ status: 'success', code: 201, data: { contact }})

  }
  
const deleteContact = async (req, res) => {
      const userId = req.user._id;
      const contact = await Contacts.removeContact(req.params.contactId, userId);
      if (contact) {
        return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact }, message: 'contact deleted'})
      }
      throw new CustomError(404, 'Not Found');
  }
  
const updateContact = async (req, res, next) => {
      const userId = req.user._id;
      const contact = await Contacts.updateContact(req.params.contactId, req.body, userId);
      if (contact) {
        return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact }})
      }
      throw new CustomError(404, 'Not Found');
  }

  const updateStatusContact = async (req, res, next) => {
      const userId = req.user._id;
      const contact = await Contacts.updateContact(req.params.contactId, req.body, userId);
      if (contact) {
        return res
          .status(200)
          .json({ status: 'success', code: 200, data: { contact }})
      }
      throw new CustomError(404, 'Not Found');
  };

  module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateStatusContact,
  }