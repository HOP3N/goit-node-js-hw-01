const { program } = require('commander');

const {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await getAllContacts();
      console.table(contacts);
      break;
    case 'get':
      const contact = await getContactById(id);
      console.table(contact);
    case 'add':
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
    case 'remove':
      const removeContactEl = await removeContact(id);
      console.table(removeContactEl);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
