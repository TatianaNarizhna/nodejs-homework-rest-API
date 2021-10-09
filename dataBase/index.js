const Contact = require('../model/contactModel');

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
}

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact;
}

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove({_id: contactId})
  return contact;
}

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact; 
}

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId} ,
    { ...body },
    { new: true },
  )
  return contact;
}

// const updateStatusContact = async (contactId, body) => {
//   const contact = await Contact.findOneAndUpdate
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  // updateStatusContact,
}
