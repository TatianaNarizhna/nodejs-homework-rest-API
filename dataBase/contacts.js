const Contact = require('../model/contactModel');

const listContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email gender createdAt updatedAt'
  })
  return contacts;
}

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender createdAt updatedAt'
  })
  return contact;
}

const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndRemove({_id: contactId, owner: userId})
  return contact;
}

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact; 
}

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
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
