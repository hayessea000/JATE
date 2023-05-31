
import { openDB } from 'idb';

const DB_jate = "jate"

const initdb = async () =>
  openDB(DB_jate, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_jate)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_jate, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const holdDB = await openDB(DB_jate, 1);

  const textVar = holdDB.transaction(DB_jate, 'readwrite');

  const storeVar = textVar.objectStore(DB_jate);

  const request = storeVar.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const holdDB = await openDB(DB_jate, 1);

  const textVar = holdDB.transaction(DB_jate, 'readonly');

  const storeVar = textVar.objectStore(DB_jate);

  const request = storeVar.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
