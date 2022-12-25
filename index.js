const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const { Command } = require("commander");

async function doSomeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    case "get":
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

// doSomeAction({ action: "get", id: "9" });

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      doSomeAction({ action });
      break;

    case "add":
      const [, , , , name, email, phone] = process.argv;
      doSomeAction({ action, name, email, phone });
      break;

    case "remove":
      // const [, , , , , id] = process.argv;
      doSomeAction({ action, id });
      break;

    case "get":
      const [, , , , , id] = process.argv;
      doSomeAction({ action, id });
      break;

    default:
      throw new Error(`unknown action, got: ${action}`);
  }
}

invokeAction(argv);
