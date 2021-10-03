const crypto = require('crypto');
// const { stringify } = require('querystring');
const DataBase = require('./dataBase');
const db = new DataBase('contacts.json');

const listContacts = async () => {
  return await db.readData()
}

const getContactById = async (contactId) => {
  const contacts = await db.readData()
  const [contact] = contacts.filter((contact) => contact.id === Number(contactId))
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await db.readData()
  const index = contacts.findIndex((contact) => contact.id === Number(contactId))
  if (index !== -1) {
    const [result] = contacts.splice(index, 1)
    await db.writeData(contacts)
    return result;
  }
  return null;
}

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

const updateContact = async (contactId, body) => {
  const contacts = await db.readData()
  const index = contacts.findIndex((contact) => contact.id === Number(contactId))
  if (index !== -1) {
  
    contacts[index] = { ...contacts[index], ...body }
    await db.writeData(contacts)
    return contacts[index];
  }
  return null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
