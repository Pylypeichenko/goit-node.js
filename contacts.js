const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(
  __dirname,
  path.dirname("/db/contacts.json"),
  path.basename("contacts.json")
);

async function listContacts() {
  try {
    const rawData = await fs.readFile(contactsPath, "utf8");
    const contactList = JSON.parse(rawData);
    return contactList;
  } catch (error) {
    return console.log(error.message);
  }
}

async function writeList(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(id) {
  const contactList = await listContacts();

  for (const contact of contactList) {
    if (contact.id === id) {
      console.log("name: ", contact.name);
      console.log("email: ", contact.email);
      console.log("phone: ", contact.phone);
    }
  }
}

async function removeContact(id) {
  const contactList = await listContacts();

  const updList = contactList.filter((contact) => contact.id !== id);

  await writeList(updList);
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const contact = {
      id,
      name,
      email,
      phone,
    };

    const contactList = await listContacts();

    contactList.push(contact);

    await writeList(contactList);
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
