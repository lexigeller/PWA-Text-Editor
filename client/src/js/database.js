import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ value: content });

    await tx.done;
    console.log('Data added to the database');
  } catch (error) {
    console.error(error);
  }
};

// Method that gets all the content from the database
export const getDb = async () => {
  try {
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);

    const result = await request;
    return result?.value;
  } catch (error) {
    console.error(error);
  }
};

initdb();
