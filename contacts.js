const fs = require('fs');
const path = require('path'); 
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json')


// TODO: udokumentuj każdą funkcję
function listContacts() {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
          console.error('Error: ', err);
          return;
        }
        const parsedData = JSON.parse(data);
        console.table(parsedData);
      });
}
    
function getContactById(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if 
        (err) {
            console.log('Error: ', err);
            return;
        }
        const parsedData = JSON.parse(data);
        const contactById = parsedData.find((contact) => contact.id === contactId);
        console.table(contactById);
    })
}
  
function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error:', err);
            return;
        }

        let contacts = JSON.parse(data);
        const index = contacts.findIndex((contact) => contact.id === contactId);

        if (index !== -1) {
            contacts.splice(index, 1);
            fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('Contact removed successfully.');
                }
            });
        } else {
            console.log('Contact with the specified ID was not found.');
        }
    });
}

  
function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error:', err);
            return;
        }

        let contacts = JSON.parse(data);
        const contactToAdd = { id: nanoid(), name, email, phone };

        if (contacts.some(contact => contact.email === email)) {
            console.log(`${email} is already added`);
            return
        } else {
            contacts.push(contactToAdd);
            fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Contact added successfully.');
            }
        });

        }
        
    })}
    
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}