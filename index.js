const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

async function doSomeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts();
      break;

    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    case "find":
      await getContactById(id);
      break;

    default:
      throw new Error(`unknown action, got: ${action}`);
  }
}

// doSomeAction({ action: "list" });

// doSomeAction({
//   action: "add",
//   name: "qwe",
//   email: "qwe@gmail.com",
//   phone: "123123123",
// });

// doSomeAction({ action: "remove", id: "9P_a0OfPSU700VBWzsoOX" });

// doSomeAction({ action: "find", id: "9" });
