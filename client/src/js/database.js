import { openDB } from 'idb';

const initdb = async () =>
  openDB('tmm', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('tmm')) {
        console.log('tmm database already exists');
        return;
      }
      db.createObjectStore('tmm', { keyPath: 'id', autoIncrement: true });
      console.log('tmm database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const tmmDb = await openDB('tmm', 1);
  const tx = tmmDb.transaction('tmm', 'readwrite');
  const store = tx.objectStore('tmm');
  const request = store.put({ id: 1, text: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.log('GET all from the database');
  const tmmDb = await openDB('tmm', 1);
  const tx = tmmDb.transaction('tmm', 'readonly');
  const store = tx.objectStore('tmm');
  const request = store.getAll();
  const result = await request;
  // console.log('result.value', result);
  return result;
};

initdb();
