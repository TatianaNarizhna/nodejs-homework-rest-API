const crypto = require('crypto');
const DataBase = require('./dataBase');
const db = new DataBase('contacts.json');

const listContacts = async () => {
  return await db.readData()
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const contacts = await db.readData()
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  }
  contacts.push(newContact);
  await db.writeData(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
