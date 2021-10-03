const fs = require('fs/promises');
const path = require('path');

class ContactsAdapter {
    constructor(file) {
        this.file = path.join(__dirname, file);
    }

    async readData() {
        const result = await fs.readFile(this.file, 'utf8')
        const data = JSON.parse(result)
        return data;
    }

    async writeData(data) {
        await fs.writeFile(this.file, JSON.stringify(data))
    }
};

module.exports = ContactsAdapter;
