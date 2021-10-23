const { updateContact } = require('../controllers/contactsController');
const Contacts = require('../dataBase/contacts'); 
const { CustomError } = require('../helpers/customError');

jest.mock('../dataBase/contacts');

describe('Unit test controller updateContact', () => {
    let req, res, next

    beforeEach(() => {
        Contacts.updateContact = jest.fn();
        req = { params: { id: 1 }, body: {}, user: { _id: 2 }}
        res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data), }
        next = jest.fn()
    })

    it('Contact exist', async () => {
        const contact = { id: 1, name: 'Mery', email: 'Mary@ukr.net' }
        Contacts.updateContact = jest.fn(() => {
            return contact;
        })
        const result = await updateContact(req, res, next);
        expect(result).toBeDefined()
        expect(result).toHaveProperty('status')
        expect(result).toHaveProperty('code')
        expect(result).toHaveProperty('data')
        expect(result.data.contact).toEqual(contact)
    })

    it('Contact do not exist', async () => {
        await expect(updateContact(req, res, next)).rejects.toEqual(new CustomError(404, 'Not Found'),)
    })

    it('Contact do not exist',  () => {
      return updateContact(req, res, next).catch((e) => {
          expect(e.status).toEqual(404)
          expect(e.message).toEqual('Not Found')
      })
    })
})